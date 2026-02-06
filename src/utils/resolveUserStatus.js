const PRESENCE_TTL_MS = 70_000

export function resolveUserStatus(user) {
  if (!user.last_seen) {
    return { status: 'offline', playing: null }
  }

  const diff = Date.now() - new Date(user.last_seen).getTime()

  if (diff > PRESENCE_TTL_MS) {
    return { status: 'offline', playing: null }
  }

  return user.status
}