import React, {useRef} from 'react'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'

interface IProgressVolumeBar {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    isMuted: boolean;
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressVolumeBar = ({volume, isMuted, videoRef, setIsMuted, setVolume}: IProgressVolumeBar) => {

    const progressVolumeBarRef: React.MutableRefObject<HTMLProgressElement | null> = useRef(null);

    const handleVolumeBar = (e: React.MouseEvent) => {
        if (progressVolumeBarRef.current && videoRef.current) {
          const clickX = e.nativeEvent.offsetX;
          const progressBarWidth = progressVolumeBarRef.current?.clientWidth;
          const newPercentage = (clickX / progressBarWidth) * 100;
          const newVolume = (newPercentage / 100);
          videoRef.current.volume = newVolume;
          setVolume(newVolume * 100);
          if(newVolume > 0) {
            setIsMuted(false);
          }
        }
    }
    
    const toggleAudio = () => {
        if (videoRef.current) {
            if (isMuted) {
            setVolume(50);
            videoRef.current.volume = 0.50;
            setIsMuted(false);
            } else {
            setVolume(0);
            videoRef.current.volume = 0;
            setIsMuted(true);
            }
        }
    }    

  return (
    <div className="volume">
        {isMuted ? <BsFillVolumeMuteFill  onClick={toggleAudio}/> : <BsFillVolumeUpFill onClick={toggleAudio}/>}
        <progress onClick={handleVolumeBar} ref={progressVolumeBarRef} id="volume" value={volume} max="100"/>
    </div>
  )
}

export default ProgressVolumeBar