from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Like

# like_routes = Blueprint('likes', __name__)

# # POST
# @like_routes.route('/<int:songId>', methods=['POST'])
# @login_required
# def likes():
#     """
#     A logged in user can like a song
#     """
#     artistId = current_user.id
#     newLike = Like(artistId, songId)
#     db.session.add(newLike)
#     db.session.commit()
#     return {'message': "Success"}

# # DELETE
# @like_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def like(id):
#     """
#     A logged in user can unlike a song
#     """
#     like = Like.query.filter_by(id=likeId)
    
#     if not like:
#         return {"error": {"Like not found"}}, 404
    
#     if like.artist_id != current_user.id:
#         return {"error": {"You do not have permission to delete this like"}}, 403
    
#     db.session.delete(like)
#     db.session.commit()
    
#     return {'message': "Successfully deleted"}, 200
