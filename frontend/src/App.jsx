import { useState } from "react";
import React from "react";
import L from "leaflet";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import "./main.css";
import icon from "leaflet/dist/images/marker-icon.png";
import Map from './Map.jsx'

export default function App() {
  const [position, setPosition] = useState(null);
  const [desc, setDesc] = useState(null);

  // Configure leaflet Marker icon - without this it is broken 💩
  // Wow this kind of sucks and was super hard to find!
  const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: null  });
  L.Marker.prototype.options.icon = DefaultIcon;

  console.log("BACKEND RUNNING AT " + process.env.REACT_APP_BACKEND);

  async function postReport() {
    await axios({
      method: 'post',
      url: process.env.REACT_APP_BACKEND + '/notifications',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone',
        position: position,
        description: desc,
      }
    });
    alert("Your report was sent.");
  }

  function report() {
    if (!position) {
      alert('Please mark on map where your bike was stolen before you submit!');
      return;
    }
    if (!desc) {
      alert('Please enter description before you submit!');
      return;
    }
    postReport();
  }

  return (
    <div className="form">
      <Map position={position} setPosition={setPosition} />
      <div className="form-fields">
        <h3>Report abandoned bicycle</h3>
        {position && <>GPS: {position.lat}, {position.lng}</>}
        <br />
        <textarea
          onChange={e=>setDesc(e.target.value)}
          placeholder="Write short description here"
        >{desc}</textarea>
        <button onClick={report}>Send report</button>
      </div>
    </div>
  );
}
