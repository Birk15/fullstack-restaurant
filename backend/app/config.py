import os
from dotenv import load_dotenv
from pymongo import MongoClient

# .env-Datei laden
load_dotenv()

class Config:
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret_key')
    MONGO_URI = os.getenv('DB_URI')

client = MongoClient(Config.MONGO_URI)
db = client['myFirstDb']

# Optional: Eine spezifische Collection abrufen
def get_collection(collection_name):
    return db[collection_name]