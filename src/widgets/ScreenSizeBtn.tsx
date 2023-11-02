import React from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'

interface IScreenSizeBtn {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    isFullScreen: boolean;
    setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScreenSizeBtn = ({videoRef, isFullScreen, setIsFullScreen}: IScreenSizeBtn) => {

    const handleFullScreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
            setIsFullScreen(!isFullScreen);
        }
    }

  return (
    <button onClick={handleFullScreen} className="toggle-screensize">
    {isFullScreen ? <AiOutlineFullscreenExit/> : <AiOutlineFullscreen/>}
    </button>
  )
}

export default ScreenSizeBtn