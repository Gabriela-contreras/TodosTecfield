import { useEffect, useState } from "react"

const TOAST_STYLES = {
  success: {
    container: "bg-green-500/10 border-green-500/30",
    icon: "text-green-400",
    text: "text-green-300",
  },
  error: {
    container: "bg-red-500/10 border-red-500/30",
    icon: "text-red-400",
    text: "text-red-300",
  },
  info: {
    container: "bg-violet-500/10 border-violet-500/30",
    icon: "text-violet-400",
    text: "text-violet-300",
  },
}

const ICONS = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

export function Toast({ message, type = "info", onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const styles = TOAST_STYLES[type] || TOAST_STYLES.info
  const icon = ICONS[type] || ICONS.info

  useEffect(() => {
    // Trigger entrada animation
    const showTimer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(showTimer)
  }, [])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm
        transition-all duration-200 ease-out
        ${styles.container}
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <span className={styles.icon}>{icon}</span>
      <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
      <button
        onClick={handleClose}
        className={`ml-2 p-1 rounded hover:bg-white/10 transition-colors ${styles.icon}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

