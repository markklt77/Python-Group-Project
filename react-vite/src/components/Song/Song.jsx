import "./song.css"

function Song({ song }) {
    const handleClick = () => {
        console.log(song.url)
    }

    return (
        <div>
            <button onClick={handleClick}>Play</button>
        </div>
    )
}

export default Song;
