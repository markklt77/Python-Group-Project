import { FiPlus } from "react-icons/fi";

function Sidebar() {
    return (
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
    )
}

export default Sidebar;
