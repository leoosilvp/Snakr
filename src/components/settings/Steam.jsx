import { useState } from 'react';
import { useUser } from '../../hooks/useUser'

const Steam = () => {

    const { user } = useUser();

    const isLogged = Boolean(user?.steam_id)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(user?.steam_id)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }


    return (
        <section className="settings-steam">
            <header className="settings-steam-header">
                <img src="https://img.itch.zone/aW1nLzE4MzUyNzA4LnBuZw==/original/GauNfb.png" />
                <a href={isLogged ? '#' : 'https://backend-snakr.vercel.app/api/auth/steam'}>{isLogged ? 'Conected' : 'Conect'}</a>
            </header>

            {isLogged ? (
                <section className='settings-steam-content'>
                    <h1>Você ja está conectado com sua conta steam!</h1>
                    <h3>Seu ID:<span onClick={handleCopy} ><i onClick={handleCopy} className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'} />{user?.steam_id}</span></h3>
                </section>
            ) : (
                <section className='settings-steam-content'>
                    <h1>Conecte sua conta Steam e personalize sua experiência!</h1>
                    <p>Ao integrar sua conta Steam, o Snakr sincroniza automaticamente
                        sua biblioteca, conquistas e informações do perfil.
                    </p>
                    <h2>Benefícios</h2>
                    <ul>
                        <li>Importação automática dos seus jogos</li>
                        <li>Exibição de conquistas e estatísticas</li>
                        <li>Perfil mais completo e personalizado</li>
                    </ul>

                </section>
            )}
        </section>
    )
}

export default Steam
