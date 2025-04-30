const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('../server/models/userModel');
const app = express();
app.use(express.json())
const port = 5000;
app.use(cors());
connectDB();
app.post('/signup', async (req, res) => {
  const { username, email, password, mobno } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, mobno });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.log(error);
  }


});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid username or password' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

  const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
});


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log(token)
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};



app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user =await  User.findOne({ username: req.user.username })
    res.status(200).json({user});
  } catch (error) {   
    console.log("error at get profile", error);
    res.status(500).json("Internal server error");
  }
})
// Update profile information
app.put('/profile/update', authenticateToken, async (req, res) => {
  console.log("profile")
  try {
    const { username, email, mobno, currentPassword } = req.body;
    const user = await User.findOne({ username: req.user.username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Prepare updates
    const updates = {};
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) return res.status(400).json({ message: 'Username already taken' });
      updates.username = username;
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ message: 'Email already in use' });
      updates.email = email;
    }

    if (mobno && mobno !== user.mobno) {
      updates.mobno = mobno;
    }

    // Apply updates
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: updates },
      { new: true }
    );

    // Generate new token if username changed
    let token;
    if (username && username !== req.user.username) {
      token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    }

    res.json({
      message: 'Profile updated successfully',
      token,
      username: updatedUser.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update password
app.put('/profile/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ username: req.user.username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
