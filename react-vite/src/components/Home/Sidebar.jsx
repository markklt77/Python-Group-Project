import { FiPlus } from "react-icons/fi";
import Collection from "../Collection/Collection";

function Sidebar() {
    return (
        <>
            <div className="head-container">
                <div className="side-head">
                    <h3>Library</h3>
                    <FiPlus className="faplus"/>
                </div>
                <div className="side-filters">
                    <button className="filter-buttons">
                        Playlists
                    </button>
                    <button className="filter-buttons">
                        Albums
                    </button>
                </div>
            </div>
            <div>
                <Collection />
            </div>
        </>
    )
}

export default Sidebar;
