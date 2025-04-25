import React, { useEffect, useRef, useState } from 'react';
import {Volume2, VolumeX } from 'lucide-react'; 
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  MoreHorizontal,
  Home,
  Search,
  Compass,
  Clapperboard,
  MessageSquare,
  Bell,
  PlusSquare,
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { useNavigate ,useLocation } from 'react-router-dom';
import '../styles/Home.css';
const postData = [
  {
      id: 1,
      username: '_Batman_',
      userAvatar: '../images/a1.jpg',
      media: '../images/bvs.mp4',
      mediaType: 'video',
      likes: 14100000,
      caption: '"Fear the night. Unleash the Batman."',
      hashtags: '#Batman #batman #Bat_man #bat_Man #Batman v Superman #DC #batman_DC #DC universe #dc batman #DC Batman #sigma #DC #Gothamcity #Bruce Wayne #Dark Knight',
      comments: [
          { username: 'joker', text: 'why so serious?' },
          { username: 'gordon', text: 'we need you batman' }
      ]
  },
  {
      id: 2,
      username: '_Superman_',
      userAvatar: '../images/a2.jpg',
      media: '../images/b2.jpg',
      mediaType: 'image',
      likes: 11500000,
      caption: '"Truth , Justice and American way."',
      hashtags: '#Superman #superman #Super_man #super_man #Batman v Superman #DC #superman_DC #DC universe #dc superman #DC Superman #Symbol of Hope #superman #Superman',
      comments: [
          { username: 'batman', text: 'Men are brave!' }
      ]
  },
  {
      id: 3,
      username: 'Wonder_Woman',
      userAvatar: '../images/a3.jpg',
      media: '../images/b3.jpg',
      mediaType: 'image',
      likes: 8300000,
      caption: '"So long as life remains, there is always hope... and so long as there is hope, there can be victory!"',
      hashtags: '#Wonder Woman #Wonder_Woman_1984 #WW84 #wonder_woman #Gal Gadot',
      comments: []
  },
  {
      id: 4,
      username: '_Flash_',
      userAvatar: '../images/a4.jpg',
      media: '../images/b4.webp',
      mediaType: 'image',
      likes: 2300000,
      caption: '"Empower the extraordinary within."',
      hashtags: '#Flash #flash #flash_DC #DC #dc_flash',
      comments: []
  },
  {
      id: 5,
      username: '_Aquaman_',
      userAvatar: '../images/a5.jpg',
      media: '../images/b5.jpg',
      mediaType: 'image',
      likes: 3800000,
      caption: '"Protector of the deep, ruler of the seas."',
      hashtags: '#Born to be Ruler.....#Aquaman DC #Aquaman',
      comments: []
  },
  {
      id: 6,
      username: '_Joker_',
      userAvatar: '../images/a6.jpg',
      media: '../images/b6.jpg',
      mediaType: 'image',
      likes: 12100000,
      caption: '"To kill Batman."',
      hashtags: '#JOKER #JOKER V BATMAN #Batman The Dark Knight #Joker dark knight #Heath ledger',
      comments: []
  },
  {
      id: 7,
      username: 'Harley_Quinn',
      userAvatar: '../images/a7.jpg',
      media: '../images/b7.jpg',
      mediaType: 'image',
      likes: 7000000,
      caption: '"Crazy meets chaos in the heart of mayhem."',
      hashtags: '#harley quinn #Harley Quinn',
      comments: []
  },
  {
      id: 8,
      username: '_dc_comics_',
      userAvatar: '../images/logo.jpg',
      media: '../images/jokvid.mp4',
      mediaType: 'video',
      likes: 30000000,
      caption: '',
      hashtags: '#Joker #joker #Why so serious? #The Dark knight',
      comments: []
  }
];
const NavBar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };

  return (
    <div className="nav-bar">
      <nav className="instagram-nav">
        <div className="nav-logo">
          <img src="./images/instagram-logo.png" width="150px" alt="Logo" />
        </div>

        <button className="nav-item">
          <a href="/"><Home size={24} className="nav-icon" /><span>Home</span></a>
        </button>

        <button className="nav-item">
          <a href="#"><Search size={24} className="nav-icon" /><span>Search</span></a>
        </button>

        <button className="nav-item">
          <a href="#"><Compass size={24} className="nav-icon" /><span>Explore</span></a>
        </button>

        <button className="nav-item">
          <a href="#"><Clapperboard size={24} className="nav-icon" /><span>Reels</span></a>
        </button>

        <button className="nav-item">
          <a href="#"><MessageSquare size={24} className="nav-icon" /><span>Messages</span></a>
        </button>

        <button className="nav-item">
          <a href="#"><Bell size={24} className="nav-icon" /><span>Notifications</span></a>
        </button>

        <button className="nav-item">
          <a href="#"><PlusSquare size={24} className="nav-icon" /><span>Create</span></a>
        </button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <button className="nav-item">
          {username ? (
            <a href="/profile">
            <User size={24} className="nav-icon" />
            <span>{username}</span>
          </a>
          ) : (
            <a href="/signup"><User size={24} className="nav-icon" /><span>Sign in</span></a>
          )}
        </button>

        <button className="nav-item">
          {username ? (
            <span onClick={handleLogout} className="nav-user logout">
              <LogOut size={24} className="nav-icon" /><span>Logout</span>
            </span>
          ) : (
            <a href="/login"><LogIn size={24} className="nav-icon" /><span>Login</span></a>
          )}
        </button>
      </nav>
    </div>
  );
};

const StoryItem = ({ avatar, username }) => {
    return (
        <div className="story-item">
            <div className="story-avatar">
                <img src={avatar} alt={username} />
            </div>
            <span className="story-username">{username}</span>
        </div>
    );
};

const PostHeader = ({ avatar, username }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="post-header">
            <div className="post-user-info">
                <img src={avatar} alt={username} />
                <h6>{username}</h6>
            </div>
            <div className="post-options" onClick={() => setShowOptions(!showOptions)}>
                <MoreHorizontal />
                {showOptions && (
                    <div className="options-dropdown">
                        <ul>
                            <li>Report</li>
                            <li>Copy Link</li>
                            <li>Share</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};


const Post = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.75 }
        );

        const video = videoRef.current;
        if (video) observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isVisible) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }
    }, [isVisible]);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
      
        <div className="post-container">
            <PostHeader avatar={post.userAvatar} username={post.username} />
            <div className="post-media">
  {post.mediaType === 'video' ? (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        src={post.media}
        muted={isMuted}
        loop
        playsInline
        className="video-player"
      />
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  ) : (
    <img src={post.media} alt={post.username} className="image-player" />
  )}
</div>

            <div className="post-interactions">
                <div className="interaction-icons">
                    <Heart 
                        onClick={() => setLiked(!liked)} 
                        color={liked ? 'red' : 'white'}
                        fill={liked ? 'red' : 'none'}
                    />
                    <MessageCircle />
                    <Bookmark 
                        onClick={() => setBookmarked(!bookmarked)}
                        color="white"
                        fill={bookmarked ? 'white' : 'none'}
                    />
                </div>
            </div>

            <div className="post-details">
                <p className="post-likes">{post.likes.toLocaleString()} likes</p>
                <p className="post-caption">{post.caption}</p>
                <div className="post-hashtags">{post.hashtags}</div>
                
                {post.comments.map((comment, index) => (
                    <div key={index} className="post-comment">
                        <span className="comment-username">{comment.username}</span>
                        <span className="comment-text">{comment.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const DcgramHomepage = () => {
    // Story data
    const stories = [
        { avatar: '../images/a1.jpg', username: '_Batman_' },
        { avatar: '../images/a2.jpg', username: '_Superman_' },
        { avatar: '../images/a3.jpg', username: 'Wonder_Woman' },
        { avatar: '../images/a4.jpg', username: '_Flash_' },
        { avatar: '../images/a5.jpg', username: '_Aquaman_' },
        { avatar: '../images/a6.jpg', username: '_Joker_' },
        { avatar: '../images/a7.jpg', username: 'Harley_Quinn' },
    ];

    return (<div><NavBar />
        <div className="dcgram-homepage">
            <div className="stories-container">
                {stories.map((story, index) => (
                    <StoryItem 
                        key={index} 
                        avatar={story.avatar} 
                        username={story.username} 
                    />
                ))}
            </div>

            <div className="posts-container">
                {postData.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
        </div>
    );
};

export default DcgramHomepage;