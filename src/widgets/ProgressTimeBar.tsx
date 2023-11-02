import React, {useRef} from 'react'
import { formatTime } from '../utils';

interface IProgressTimeBar {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
    timestamp: number;
    videoDuration: number;
}

const ProgressTimeBar = ({videoRef, timestamp, videoDuration}: IProgressTimeBar) => {

    const progressTimeBarRef: React.MutableRefObject<HTMLProgressElement | null> = useRef(null);

    const handleTimerBar = (e: React.MouseEvent) => {
        if (progressTimeBarRef.current && videoRef.current) {
          const clickX = e.nativeEvent.offsetX;
          const progressBarWidth = progressTimeBarRef.current?.clientWidth;
          const newPercentage = (clickX / progressBarWidth) * 100;
          const newTime = (newPercentage / 100) * videoRef.current.duration;
          videoRef.current.currentTime = newTime;
        }
    };

  return (
    <>
    <progress ref={progressTimeBarRef} onClick={handleTimerBar} id="time" value={(timestamp / videoDuration) * 100} max="100"/>
    <p className="timer">{formatTime(timestamp)} / {formatTime(videoDuration)}</p>
    </>
  )
}

export default ProgressTimeBar