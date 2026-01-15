import '../css/notifications.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import useNotification from '../hooks/useNotification';
import { useState } from 'react';


const Notifications = () => {

    const { notifications } = useNotification();
    const [filter, setFilter] = useState('All');

    const filteredNotifications = notifications.filter(item => {
        if (filter === 'All') return true;
        return item.type === filter;
    });

    return (
        <main className='notifications-main'>
            <Header />
            <section className='notifications-content'>
                <article className='notifications-content-header'>
                    <h1>Notifications</h1>
                    <section className='notifications-filter'>
                        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
                        <button className={filter === 'Notification' ? 'active' : ''} onClick={() => setFilter('Notification')}>Notification</button>
                        <button className={filter === 'Message' ? 'active' : ''} onClick={() => setFilter('Message')}>Message</button>
                    </section>
                </article>

                {filteredNotifications.length === 0 && (
                    <div className="notifications-empty">
                        <i className='fa-regular fa-bell-slash' />
                        <h1>No notifications available</h1>
                    </div>
                )}

                <section className='notifications-feed'>
                    {filteredNotifications.map(item => (
                        <article className='notifications-ctn' key={item.id}>
                            <section className='notifications-date'>
                                <h1>{item.type}</h1>
                                <h2>{item.data}</h2>
                            </section>

                            <section className='notifications'>
                                {item.videoUrl && <video src={item.videoUrl} controls preload="metadata" />}

                                {item.imgUrl && (
                                    <img src={item.imgUrl} alt={item.title} />
                                )}

                                <section className='notification'>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </section>
                            </section>
                        </article>
                    ))}
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Notifications
