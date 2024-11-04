import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import {
  HOME_ROUTE,
  GASTHAUS_ROUTE,
  GETRÄNKEKARTE_ROUTE,
  RESERVIEREN_ROUTE,
} from "../constanten/const";
import axios from "axios";
import { Button, FormControl } from "react-bootstrap";

const MyNavbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // useEffect für Event-Listener Management
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Log In
  const [users, setUsers] = useState([]);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [existingEmail, setExistingEmail] = useState(false);
  const [success, setSuccess] = useState(false);

  const regNameInputRef = useRef();
  const regEmailInputRef = useRef();
  const regPasswordInputRef = useRef();
  // Log In
  const logEmailInputRef = useRef();
  const logPasswordInputRef = useRef();

  // after confirm register
  const handleRegister = async (event) => {
    event.preventDefault(); // Seite wird nicht neu geladen

    const name = regNameInputRef.current.value; // aktuellen Wert des Namen Inputs
    const email = regEmailInputRef.current.value; // aktueller Wert des Email Inputs
    const password = regPasswordInputRef.current.value; // aktueller Wert des Passwort Inputs

    // E-Mail-Überprüfung
    if (users.some((user) => user.email === email)) {
      setExistingEmail(true);
      console.log("E-Mail existiert bereits!");
      return;
    } else {
      setExistingEmail(false);
    }

    const newUser = { name, email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/addUser",
        newUser
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Benutzers:", error);
    }
    setSuccess(true);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    const email = logEmailInputRef.current.value;
    const password = logPasswordInputRef.current.value;

    if (
      users.some((user) => user.email === email && user.password === password)
    ) {
      console.log("success success");
    } else {
      console.log("user not found");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten", error);
      });
  }, []);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowLogIn(false);
      setShowRegister(false);
      setExistingEmail(false);
      setSuccess(false);
    }
  };

  return (
    <div className="navbar">
      <p className="showWidth">{`${width}px x ${height}px`}</p>
      <div className="navbar-items">
        <div style={{ width: 34 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              d="M57.49 47.74l368.43 368.43a37.28 37.28 0 010 52.72h0a37.29 37.29 0 01-52.72 0l-90-91.55a32 32 0 01-9.2-22.43v-5.53a32 32 0 00-9.52-22.78l-11.62-10.73a32 32 0 00-29.8-7.44h0a48.53 48.53 0 01-46.56-12.63l-85.43-85.44C40.39 159.68 21.74 83.15 57.49 47.74z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              d="M400 32l-77.25 77.25A64 64 0 00304 154.51v14.86a16 16 0 01-4.69 11.32L288 192M320 224l11.31-11.31a16 16 0 0111.32-4.69h14.86a64 64 0 0045.26-18.75L480 112M440 72l-80 80M200 368l-99.72 100.28a40 40 0 01-56.56 0h0a40 40 0 010-56.56L128 328"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
        </div>
        <ul className={`links ${isActive ? "active" : ""}`}>
          <li>
            <button onClick={() => navigate(HOME_ROUTE)}>HOME</button>
          </li>
          <li>
            <button onClick={() => navigate(GASTHAUS_ROUTE)}>
              DAS GASTHAUS
            </button>
          </li>
          <li>
            <button onClick={() => navigate(GETRÄNKEKARTE_ROUTE)}>
              GETRÄNKEKARTE
            </button>
          </li>
          <li>
            <button onClick={() => navigate(RESERVIEREN_ROUTE)}>
              RESERVIEREN
            </button>
          </li>
        </ul>
        <div className="menu toggle-btn" onClick={handleToggle}>
          {/* Menu Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34px"
            viewBox="0 -960 960 960"
            width="34px"
            fill="#00eaff"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <Button
            type="button"
            onClick={() => setShowLogIn(true)}
            variant="outline-dark"
          >
            LogIn
          </Button>
          <Button
            type="button"
            onClick={() => setShowRegister(true)}
            variant="outline-dark"
          >
            Register
          </Button>
        </div>

        {/*Registration Div*/}
        {showRegister && (
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
              onSubmit={handleRegister}
              style={{
                marginTop: 200,
                width: 500,
                padding: 40,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <h4>Register:</h4>
              <FormControl
                ref={regNameInputRef}
                type="text"
                placeholder="enter Name..."
                required
              />
              <FormControl
                ref={regEmailInputRef}
                type="email"
                placeholder="enter Email..."
                required
              />
              <FormControl
                ref={regPasswordInputRef}
                type="password"
                placeholder="create your Password..."
                required
              />
              <Button type="submit">Confirm</Button>
              {existingEmail && (
                <p style={{ color: "red" }}>
                  Diese E-Mail ist bereits registriert!
                </p>
              )}
              {success && (
                <p style={{ color: "green" }}>Erfolgreich registriert!</p>
              )}
            </form>
          </div>
        )}

        {/*LogIn Div*/}
        {showLogIn && (
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
              onSubmit={handleLogIn}
              style={{
                marginTop: 200,
                width: 500,
                padding: 40,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <h4>Log In:</h4>
              <FormControl
                ref={logEmailInputRef}
                type="email"
                placeholder="enter Email..."
                required
              />
              <FormControl
                ref={logPasswordInputRef}
                type="password"
                placeholder="Password..."
                required
              />
              <Button type="submit">Confirm</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNavbar;
