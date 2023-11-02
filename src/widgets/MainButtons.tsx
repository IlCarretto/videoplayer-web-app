import React from 'react'
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
import { BsFillPlayFill, BsPauseBtn, BsStopFill } from 'react-icons/bs';

interface IMainButtons {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
    timestamp: number;
    setTimestamp: React.Dispatch<React.SetStateAction<number>>;
    videoDuration: number;
    isPaused: boolean;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainButtons = ({videoRef, timestamp, setTimestamp, videoDuration, isPaused, setIsPaused}: IMainButtons) => {

    const handleGoBack = () => {
        if(videoRef.current) {
          if (timestamp > 0 && timestamp <= 5) {
            setTimestamp(0);
            videoRef.current.currentTime = 0;
          } else if (timestamp > 5) {
            setTimestamp(timestamp - 5);
            videoRef.current.currentTime -= 5;
          } else {
            return;
          }    
        }
      }
    
    const handleGoForward = () => {
        if(videoRef.current) {
            if (timestamp + 5 > videoDuration) {
            setTimestamp(videoDuration);
            videoRef.current.currentTime = videoDuration - 0.5;
            } else {
            setTimestamp(timestamp + 5);
            videoRef.current.currentTime += 5;
            }
            videoRef.current.pause();
            if (!isPaused) {
            videoRef.current.play();
            }
        }
    }

    const togglePlayVideo = () => {
        if (videoRef.current) {
          if (isPaused) {
            videoRef.current.play();
            setIsPaused(false);
          } else {
            videoRef.current.pause();
            setIsPaused(true)
          }
        }
    }
      
    const stopVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = videoDuration - 0.1;
            setTimestamp(videoDuration - 0.1);
        }
    }

  return (
    <>
    <button onClick={handleGoBack} className='back'><AiFillBackward/></button>
    <button onClick={togglePlayVideo} className='toggle-pause'>
    {isPaused ? <BsFillPlayFill/> : <BsPauseBtn/>}
    </button>
    <button onClick={handleGoForward} className='forward'><AiFillForward/></button>
    <button onClick={stopVideo} className='stop'><BsStopFill/></button>
    </>
  )
}

export default MainButtons