import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'

export function ConsoleBanner() {

    const { user } = useUser()

    useEffect(() => {

        const banner = `
┌────────────────────────────────────────────────┐
│                    S N A K R                   │
├────────────────────────────────────────────────┤
│ ███████╗ ███╗   ██╗  █████╗  ██╗  ██╗ ██████╗  │
│ ██╔════╝ ████╗  ██║ ██╔══██╗ ██║ ██╔╝ ██╔══██╗ │
│ ███████╗ ██╔██╗ ██║ ███████║ █████╔╝  ██████╔╝ │
│ ╚════██║ ██║╚██╗██║ ██╔══██║ ██╔═██╗  ██╔══██╗ │
│ ███████║ ██║ ╚████║ ██║  ██║ ██║  ██╗ ██║  ██║ │
│ ╚══════╝ ╚═╝  ╚═══╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ │
└────────────────────────────────────────────────┘
`

        console.clear()
        console.log(
            `%c${banner}`,
            'color: #7b7b7b;',
            '\n',
            `${user?.profile?.username ? `Hello ${user?.profile?.username}` : 'Welcome!'}!`,
            '\n',
            '\n',
            '- System Status https://snakr.one/status',
            '\n',
            '- Docs https://snakr.one/docs',
            '\n',
            '- GitHub https://github.com/leoosilvp/Snakr',
            '\n',
            '\n'
        )
    }, [user])
}