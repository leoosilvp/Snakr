
const Banner = () => {

    const background = 'https://pbs.twimg.com/media/GFNUBmLWMAAB_IO.jpg'

    return (
        <main className="banner-home">
            <div className="banner-img" style={{ '--banner-background-img': `url(${background})` }}>
                <p>Traverse breathtaking environments, overcome unpredictable dangers, and help restore the fragilebonds between humanity. Every missionbrings you closer to rebuilding a worldthat was once lost.</p>
            </div>
        </main>
    )
}

export default Banner
