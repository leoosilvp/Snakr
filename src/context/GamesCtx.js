import { createContext, useContext } from 'react'

export const GamesCtx = createContext()

export function useGamesContext() {
    return useContext(GamesCtx)
}