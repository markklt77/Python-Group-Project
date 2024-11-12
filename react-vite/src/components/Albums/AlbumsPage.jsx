import AlbumTile from './AlbumTile'

function AlbumsPage() {
    return (
        <div className="content">
            <div className="content-header">
                <p>This page will render a list of albums</p>
            </div>
            <AlbumTile />
        </div>
    )
}

export default AlbumsPage;
