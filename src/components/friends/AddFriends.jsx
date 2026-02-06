import { Check, Copy, UserPlus } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { useState } from "react"

const AddFriends = () => {

    const { user } = useUser()

    const [copied, setCopied] = useState(false)
    const FriendCode = user?.friend_code

    const copyFriendCode = async () => {
        await navigator.clipboard.writeText(FriendCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <main className="add-friends-main">
            <header className="add-friends-main-header">
                <h1>Add friend</h1>
            </header>

            <section className="add-friend-content">
                <section className="add-friend-bycode">
                    <h1>Código único de 8 dígitos usado para adicionar amigos.</h1>
                    <div className="friend-code">
                        <h2>{FriendCode}</h2>
                        <button onClick={copyFriendCode}>{copied ? <Check size={20} /> : <Copy size={20} /> }</button>
                    </div>

                    <h1>Informe o código de amigo de quem você deseja adicionar.</h1>
                    <input type="text" placeholder="código do amigo" />
                    {/* abrir modal add-friend-list */}
                </section>

                <section className="add-friend-byusername">
                    <h1>Enter a friend's username to send an invitation.</h1>
                    <input type="text" placeholder="username" />
                    <section className="add-friend-list">
                        <Link className="add-friend-card">
                            <div>
                                <img src="data:image/jpeg;base64,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   " />
                                <h1>tozin_binladen</h1>
                            </div>
                            <button><UserPlus size={16} /></button>
                        </Link>

                        <hr />

                        <Link className="add-friend-card">
                            <div>
                                <img src="data:image/jpeg;base64,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   " />
                                <h1>tozin_binladen</h1>
                            </div>
                            <button><UserPlus size={16} /></button>
                        </Link>
                    </section>
                    <p>Ao adicionar amigos no Snakr, você pode acompanhar perfis, jogos, conquistas e atividades em comum.
                        Amigos podem visualizar informações compartilhadas, interagir com você e receber notificações sobre novidades e atualizações.
                        <br />
                        <br />
                        Os pedidos de amizade precisam ser aceitos para que a conexão seja estabelecida. Você pode gerenciar seus amigos e solicitações a qualquer momento nas configurações da sua conta.
                    </p>
                </section>
            </section>
        </main>
    )
}

export default AddFriends
