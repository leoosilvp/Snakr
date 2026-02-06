import { useEffect, useState } from "react"
import { socialService } from "../../services/social.service"
import { Mail, Search, User, UserMinus, UserPlus } from '@geist-ui/icons'

const MyFriends = () => {

    const [friends, setFriends] = useState([])

    useEffect(() => {
        socialService.listFriends().then(setFriends)
    }, [])

    return (
        <>
            <header className='friends-main-header'>
                <section className='friends-main-header-title'>
                    <h1>My friends</h1>
                    <div />
                </section>
                <section className='friends-main-header-search'>
                    <div>
                        <Search size={20} color='#c3c3c3' />
                        <input type="text" placeholder='Search for friends by username.' />
                    </div>
                </section>
            </header>

            <header className='friends-header-status'>
                <h1>PLAYING</h1>
            </header>
            <section className='friends-grid'>

                {friends.map(friend => {
                    const user = friend.users

                    return (
                        <article key={friend.id} className="friend-card playing">
                            <section className='friend-img'>
                                <img src={user.profile.photo} />
                            </section>
                            <div />
                            <section className='friend-card-content playing'>
                                <h1>{user.profile.username}</h1>
                                <h2>GTA IV</h2>
                            </section>
                            <section className='friend-remove-btn' title='remove friend'>
                                <UserMinus size={16} color='#db3939' onClick='' />
                            </section>
                        </article>
                    )
                })}
            </section>

            <header className='friends-header-status'>
                <h1>ONLINE</h1>
            </header>
            <section className='friends-grid'>

                {friends.map(friend => {
                    const user = friend.users

                    return (
                        <article key={friend.id} className="friend-card online">
                            <section className='friend-img'>
                                <img src={user.profile.photo} />
                            </section>
                            <div />
                            <section className='friend-card-content online'>
                                <h1>{user.profile.username}</h1>
                                <h2></h2>
                            </section>
                            <section className='friend-remove-btn' title='remove friend'>
                                <UserMinus size={16} color='#db3939' onClick='' />
                            </section>
                        </article>
                    )
                })}

            </section>

            <header className='friends-header-status'>
                <h1>OFFLINE</h1>
            </header>
            <section className='friends-grid'>

                {friends.map(friend => {
                    const user = friend.users

                    return (
                        <article key={friend.id} className="friend-card">
                            <section className='friend-img'>
                                <img src={user.profile.photo} />
                            </section>
                            <div />
                            <section className='friend-card-content'>
                                <h1>{user.profile.username}</h1>
                                <h2></h2>
                            </section>
                            <section className='friend-remove-btn' title='remove friend'>
                                <UserMinus size={16} color='#db3939' onClick='' />
                            </section>
                        </article>
                    )
                })}

            </section>
        </>
    )
}

export default MyFriends
