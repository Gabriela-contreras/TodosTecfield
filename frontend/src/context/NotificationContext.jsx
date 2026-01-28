import { createContext, useState, useCallback } from "react"

export const NotificationContext = createContext(null)

const NOTIFICATION_DURATION = 4000

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback(({ message, type = "info", duration = NOTIFICATION_DURATION }) => {
    const id = crypto.randomUUID()

    const notification = { id, message, type, duration }
    
    setNotifications((prev) => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const success = useCallback((message, duration) => {
    return addNotification({ message, type: "success", duration })
  }, [addNotification])

  const error = useCallback((message, duration) => {
    return addNotification({ message, type: "error", duration })
  }, [addNotification])

  const info = useCallback((message, duration) => {
    return addNotification({ message, type: "info", duration })
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

