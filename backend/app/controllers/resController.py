from flask import jsonify
from .config import get_collection

reservation = get_collection('Reservations')

def get_reservations():
    data = list(reservation.find({}))  # Hole alle Daten
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify({"data": data})

#Reservierung hinzufügen
def add_reservation():
    res_data = request.json
    if res_data:
        reservation.insert_one(res_data)
        return jsonify({"message": "Reservation hinzugefügt!"}), 201
    return jsonify({"error": "Keine Daten gesendet"}), 400

def show_tables():
    data = list(tables.find({}))
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify({"data": data})