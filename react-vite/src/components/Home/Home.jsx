import Sidebar from "./Sidebar";
import Content from "./Content";
import "./home.css"

function Home() {
    return (
        <div className="layout">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="content">
                <Content />
            </div>
        </div>
    )
}

export default Home;
