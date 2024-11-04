import React from 'react';
import "../css/bottom.css";
import { FormCheck, FormControl, Button } from 'react-bootstrap';

const Bottom = () => {
  return (
    <div className='bottom'>
      <div className='bottom-content'>

        <div className="about">
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
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
          <p>Goldener Anker<br />Inhaber: Volker Schneider</p>
        </div>

        <div className="newsletter">
          <h4 style={{color: '#a58a2a'}}>MITTAGSTISCH PER EMAIL</h4>
          <h4 style={{color: 'white', marginBottom: 20}}>Einfach hier bei unserem Newsletter eintragen:</h4>
          <div className='parent-input'>
            <p>Name</p>
            <FormControl className='input'></FormControl>
          </div>
          <div className='parent-input'>
            <p>Email</p>
            <FormControl className='input'></FormControl>
          </div>
          <div style={{display: 'flex'}}>
            	<FormCheck></FormCheck>
              <p style={{color: 'green', marginLeft: 5}}>indem du fortfährst akzeptierst du unsere Datenschutzerklärung</p>
          </div>
          <Button variant='outline-light'>Abbonieren</Button>
        </div>

        <div className="informations">
          <h3>Informations</h3>
          <p>Datenschutz <br /> Impressum</p>
        </div>
      </div>

      <div className='footer'>
        <p>birk-dinkelacker/annnyyyTexxxxttttsssssssssssssssssssssssssssssssssssssssssssss</p>
      </div>
    </div>
  )
}

export default Bottom
