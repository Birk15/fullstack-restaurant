#__init__.py
from flask import Flask
from app.routes.userRoute import setup_routes
from .config import Config

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    
    setup_routes(app)

    return app
