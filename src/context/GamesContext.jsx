import { useState, useCallback } from 'react'
import { GamesCtx } from './GamesCtx'

export function GamesProvider({ children }) {
    const [displayedGameIds, setDisplayedGameIds] = useState(new Set())

    const registerIds = useCallback((ids) => {
        setDisplayedGameIds(prev => new Set([...prev, ...ids]))
    }, [])

    return (
        <GamesCtx.Provider value={{ displayedGameIds, registerIds }}>
            {children}
        </GamesCtx.Provider>
    )
}