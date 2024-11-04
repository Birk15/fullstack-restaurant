import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, FormControl, FormCheck } from "react-bootstrap";
import "../css/components.css";
import { motion } from "framer-motion";

const Reservieren = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [xPosition, setXPosition] = useState(0); // Zustand für die y-Position
  const [tables, setTables] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Innenbereich"); // Zustand für die ausgewählte Option
  const [selectedTime, setSelectedTime] = useState("16:00-17:30");

  // useState Constanten nach Volendung der Registrierung

  const personInputRef = useRef();

  const addReservation = async (event) => {
    event.preventDefault();

    const person_count = personInputRef.current.value;

    const newReservation = { person_count };
    try {
      const response = await axios.post(
        "http://localhost:5000/addReservation",
        newReservation
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("Fehler beim hinzufügen der Registration", error);
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowDiv(false);
    }
  };

  const handleWeiterClick = () => {
    console.log(xPosition);
    setXPosition((prev) => prev - 100);
  };
  const handleZurückClick = () => {
    setXPosition((prev) => prev + 100);
  };

  const isTimeAvailable = (reservedArray) => {
    //const reservedTime = reservedArray.find((entry) => entry[time] !== undefined);
    //return reservedTime ? reservedTime[time] === false : false;

    const reservedTime = reservedArray.find(
      (entry) => entry[selectedTime] !== undefined
    );
    return reservedTime ? reservedTime[selectedTime] === false : false;
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/getTables")
      .then((response) => {
        setTables(response.data.data);
      })
      .catch((err) => {
        console.log("fehler beim laden der Tische", err);
      });
  }, []);

  return (
    <div className="parent">
      <div className="reservieren">
        <h1>Reservieren</h1>
        <Button
          onClick={() => setShowDiv(true)}
          style={{ marginTop: 30 }}
          variant="outline-dark"
        >
          JETZT RESERVIEREN
        </Button>

        {showDiv && (
          <div
            onClick={handleOutsideClick}
            style={{
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              position: "fixed",
              backgroundColor: "#00000099",
              top: 0,
              left: 0,
            }}
          >
            <form
              onSubmit={addReservation}
              style={{
                marginTop: "20vh",
                width: 500,
                height: "45vh",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: 20,
              }}
            >
              <motion.div
                animate={{ x: `${xPosition}%` }}
                transition={{ duration: 0.5 }} // Dauer der Animation
                style={{ width: "100%", height: "100%", display: "flex" }}
              >
                {/*Hinweiß und Zeitspanne*/}
                <div className="config-container">
                  <h4
                    style={{
                      color: "red",
                      textAlign: "center",
                      width: "80%",
                      marginBottom: 20,
                    }}
                  >
                    Reservierungen sind nur für den heutigen Tag möglich!
                  </h4>
                  <label>Wähle eine Uhrzeit:</label>
                  <select
                    id="reservation-time"
                    name="reservation-time"
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="16:00-17:30">16:00 - 17:30</option>
                    <option value="17:30-19:00">17:30 - 19:00</option>
                    <option value="19:00-20:30">19:00 - 20:30</option>
                    <option value="20:30-22:00">20:30 - 22:00</option>
                  </select>
                  <span
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      bottom: 10,
                      right: 16,
                    }}
                    onClick={handleWeiterClick}
                  >
                    weiter
                  </span>
                </div>

                {/*Lage und Personen Anzahl*/}
                <div
                  style={{ backgroundColor: "bisque" }}
                  className="config-container"
                >
                  <div className="config-item">
                    <label htmlFor="location">Lage:</label>
                    <select
                      id="location"
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="Innenbereich">Innenbereich</option>
                      <option value="Außenbereich">Außenbereich</option>
                    </select>
                    <span
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: 10,
                        right: 16,
                      }}
                      onClick={handleWeiterClick}
                    >
                      weiter
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: 10,
                        left: 16,
                      }}
                      onClick={handleZurückClick}
                    >
                      zurück
                    </span>
                  </div>
                  <div className="config-item">
                    <label htmlFor="person-count">Wie viele Personen?</label>
                    <FormControl
                      style={{ width: 100 }}
                      id="person-count"
                      ref={personInputRef}
                      type="number"
                    />
                    <span
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: 10,
                        right: 16,
                      }}
                      onClick={() => {
                        if (
                          personInputRef.current &&
                          personInputRef.current.value > 0
                        ) {
                          handleWeiterClick();
                        }
                      }}
                    >
                      weiter
                    </span>
                  </div>
                </div>

                <div className="config-container">
                  <p style={{ margin: 0 }}>Tisch auswählen:</p>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: 10,
                      zIndex: 99999,
                      backgroundColor: "white",
                    }}
                  >
                    {tables
                      .filter(
                        (table) =>
                          table.location === selectedLocation &&
                          isTimeAvailable(table.reserved)
                      ) // Filtere nach der ausgewählten Location und Zeit
                      .map((table) => {
                        return (
                          <FormCheck
                            style={{
                              border: "3px solid black",
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingRight: 10,
                              paddingLeft: 30,
                            }}
                            key={table.table_nr}
                            id={table.table_nr}
                            label={
                              <>
                                {`Tisch: ${table.table_nr}, Kapazität: ${table.capacity}`}
                              </>
                            }
                          />
                        );
                      })}
                  </div>
                  <Button variant="outline-dark" type="submit">
                    Reservieren
                  </Button>
                  <span
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      bottom: 10,
                      left: 16,
                    }}
                    onClick={handleZurückClick}
                  >
                    zurück
                  </span>
                </div>
              </motion.div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservieren;
