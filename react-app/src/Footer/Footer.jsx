import { useEffect, useState } from "react"


function Footer() {

    let [showLinks, setShowLinks] = useState(false)

    useEffect(() => {
        let links = document.getElementsByClassName('footer-holder')

        // console.log(links)
        links[0].addEventListener('mouseenter', () => {
            setShowLinks(true)
        })

        links[0].addEventListener("mouseleave", () => {
            setShowLinks(false)
        })

    })

    return (
        <div className="footer-holder">

            {showLinks && (
                <div className="link-holder">
                    <div>
                        <a className="link-decor" rel="noopener noreferrer" href='https://github.com/markklt77/Python-Group-Project' target='_blank'>
                            Github
                        </a>
                    </div>
                    <div>
                    <a className="link-decor" rel="noopener noreferrer" href='https://www.linkedin.com/in/abraham-garcia-822a2a344/' target='_blank'>
                            Abraham
                        </a>
                    </div>
                    <div>
                    <a className="link-decor" rel="noopener noreferrer" href='https://www.linkedin.com/in/david-salas-59a5588a/' target='_blank'>
                            David
                        </a>
                    </div>
                    <div>
                    <a className="link-decor" rel="noopener noreferrer" href='' target='_blank'>
                            Dana
                        </a>
                    </div>
                    <div>
                    <a className="link-decor" rel="noopener noreferrer" href='' target='_blank'>
                            Mark
                        </a>
                    </div>
                </div>

            )}

            {!showLinks && (
                <div>
                    About Us
                </div>
            )}

        </div>
    )
}


export default Footer
