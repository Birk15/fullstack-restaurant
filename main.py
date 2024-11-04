from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient


app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://birkdinkelacker2:6236@cluster0.m9vhp.mongodb.net/myFirstDb?retryWrites=true&w=majority')

db = client["myFirstDb"]
users = db["LogIn"]
reservation = db["Reservations"]
tables = db["Tables"]


print(client.server_info())

#post1 = {"_id": 9, "name": "Klaus", "location": "berlin"}
#users.replace_one({"_id": 9}, post1, upsert=True)

@app.route("/getUsers", methods=['GET'])
def get_users():
    data = list(users.find({}))  # Hole alle Daten
    for user in data:
        user['_id'] = str(user['_id'])
    return jsonify({"data": data})

@app.route("/addUser", methods=['POST'])
def add_user():
    user_data = request.json  # JSON-Daten vom Frontend empfangen
    if user_data:
        users.insert_one(user_data)  # Daten zur Sammlung hinzufügen
        return jsonify({"message": "User hinzugefügt!"}), 201
    return jsonify({"error": "Keine Daten gesendet"}), 400



#Reservierung

#alle Reservierungen bekommen/anzeigen
@app.route("/getReservations", methods=['GET'])
def get_reservations():
    data = list(reservation.find({}))  # Hole alle Daten
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify({"data": data})

#Reservierung hinzufügen
@app.route("/addReservation", methods=['POST'])
def add_reservation():
    res_data = request.json
    if res_data:
        reservation.insert_one(res_data)
        return jsonify({"message": "Reservation hinzugefügt!"}), 201
    return jsonify({"error": "Keine Daten gesendet"}), 400

@app.route("/getTables", methods=['GET'])
def show_tables():
    data = list(tables.find({}))
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify({"data": data})
    

if __name__ == "__main__":
    app.run(debug=True)




