'use client'
import { RiFullscreenExitFill } from 'react-icons/ri'

function FullScreenButton() {

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
  return (
    
    <div className="w-10 h-10 bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]"
      >
        <RiFullscreenExitFill size={20} onClick={() => toggleFullscreen()}/>

    </div>
  )
}

export default FullScreenButton