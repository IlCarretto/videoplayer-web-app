import React, {useState, useEffect, useRef} from 'react';
import jsonData from "./data.json";
import './App.css';
import MainButtons from './widgets/MainButtons';
import ProgressTimeBar from './widgets/ProgressTimeBar';
import ProgressVolumeBar from './widgets/ProgressVolumeBar';
import ScreenSizeBtn from './widgets/ScreenSizeBtn';

interface Video {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}


function App() {
  const [videos, setVideos] = useState<Video[]>(jsonData.mediaJSON[0].videos);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [volume, setVolume] = useState(50);
  const progressVolumeBarRef: React.MutableRefObject<HTMLProgressElement | null> = useRef(null);

  useEffect(() => {
    videoRef.current?.addEventListener('ended', () => {
      if (currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else {
        setCurrentVideoIndex(0);
      }
    })
  }, [currentVideoIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        // Once the video metadata is loaded, you can access the duration
        setVideoDuration(videoRef.current?.duration!);
      });
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        setTimestamp(videoRef.current?.currentTime!);
      });
    }
  }, []);

  const handleFullScreen = () => {
    if (videoRef.current) {
        videoRef.current.requestFullscreen();
        setIsFullScreen(!isFullScreen);
    }
  }

  return (
    <div className="App">
      <div className='player'>

        <video autoPlay width={500} ref={videoRef} src={videos[currentVideoIndex].sources[0]} typeof='mp4'/>
        <div className="controls">

          <MainButtons setIsPaused={setIsPaused} videoDuration={videoDuration} isPaused={isPaused} timestamp={timestamp} setTimestamp={setTimestamp} videoRef={videoRef}/>

          <ProgressTimeBar videoDuration={videoDuration} timestamp={timestamp} videoRef={videoRef}/>

          <ProgressVolumeBar videoRef={videoRef} isMuted={isMuted} volume={volume} setVolume={setVolume} setIsMuted={setIsMuted}/>

          <ScreenSizeBtn videoRef={videoRef} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen}/>

        </div>
      </div>
    </div>
  );
}

export default App;
