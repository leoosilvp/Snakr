import { useEffect, useState } from "react"
import { useUser } from "./useUser"

function parseNotificationDate(dateString) {
  const [day, month, year] = dateString.split("-")
  return new Date(year, Number(month) - 1, day)
}

function formatDate(date) {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export default function useNotification() {
  const { user } = useUser()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)

        if (!user?.created_at) {
          setData([])
          return
        }

        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch({API_URL})

        if (!response.ok) {
          throw new Error("Error retrieving data from the API.")
        }

        const result = await response.json()
        const userCreatedAt = new Date(user.created_at)

        const filtered = result
          .map(item => {
            const dateRaw = parseNotificationDate(item.data)

            return {
              id: item.id,
              type: item.type,
              dateRaw,
              date: formatDate(dateRaw),
              imgUrl: item.imgUrl || null,
              videoUrl: item.videoUrl || null,
              title: item.title,
              description: item.description
            }
          })
          .filter(item => item.dateRaw >= userCreatedAt)

        if (!cancelled) {
          setData(filtered)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [user])

  return {
    notifications: data,
    loading,
    error
  }
}
