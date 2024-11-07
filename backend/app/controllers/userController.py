#userController.py
from flask import jsonify, request
from app.config import get_collection

users = get_collection('LogIn')

def get_users():
    data = list(users.find({}))  # Hole alle Daten
    for user in data:
        user['_id'] = str(user['_id'])
    return jsonify({"data": data})

def add_user():
    user_data = request.json  # JSON-Daten vom Frontend empfangen
    if user_data:
        users.insert_one(user_data)  # Daten zur Sammlung hinzufügen
        return jsonify({"message": "User hinzugefügt!"}), 201
    return jsonify({"error": "Keine Daten gesendet"}), 400