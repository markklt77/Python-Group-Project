from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Like

like_routes = Blueprint('likes', __name__)

# POST
@like_routes.route('/', methods=['POST'])
@login_required
def likes():
    """
    A logged in user can like a song
    """
    artistId = request.JSON["artistId"]
    songId = request.JSON["songId"]
    newLike = Like(artistId, songId)
    db.session.add(newLike)
    db.session.commit()
    return {'message': "Success"}

# DELETE
@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def like(id):
    """
    A logged in user can unlike a song
    """
    like = Like.query.filter_by(id=id).delete()
    return {'message': "Successfully deleted"}