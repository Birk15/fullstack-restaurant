#userRoute.py
from flask import Blueprint
from flask import Blueprint
from app.controllers.userController import get_users, add_user

# Blueprint für User-Routen erstellen
user_bp = Blueprint('user', __name__)

# Routen im Blueprint definieren
@user_bp.route("/get-users")
def get_all_users():
    return get_users()

@user_bp.route("/add-user", methods=["POST"])
def create_user():
    return add_user()

def setup_routes(app):
    # Blueprint in der App registrieren
    app.register_blueprint(user_bp)