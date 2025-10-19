'use client'
import { useState, useEffect } from 'react'
import { RiFullscreenFill, RiFullscreenExitFill } from 'react-icons/ri'

function FullScreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  async function toggleFullscreen() {
    if (isProcessing) return // evita cliques rápidos
    setIsProcessing(true)
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch (err) {
      console.error('Erro ao alternar fullscreen:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div
      className="w-10 h-10 bg-[var(--base-color)] cursor-pointer
        flex items-center justify-center rounded-full text-[var(--text-color)] hover:scale-105"
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <RiFullscreenExitFill size={20} /> : <RiFullscreenFill size={20} />}
    </div>
  )
}

export default FullScreenButton
