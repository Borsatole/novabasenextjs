'use client'
import { RiFullscreenExitFill } from 'react-icons/ri'

function FullScreenButton() {
  return (
    
    <div className="w-10 h-10 bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]"
      >
        <RiFullscreenExitFill size={20} onClick={() => { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen() }}/>

    </div>
  )
}

export default FullScreenButton