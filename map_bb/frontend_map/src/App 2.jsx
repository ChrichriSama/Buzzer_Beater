import { useState } from 'react';
import Map from 'react-map-gl/mapbox';
import {Marker} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';


  function App() {

    return (

        <div className="App">
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX}
            initialViewState={{
              longitude: 2.294481,
              latitude: 48.858370,
              zoom: 10
            }}
            style={{width: "100vw", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={2.294481} latitude={48.858370} anchor="bottom" >
                <div>ici</div>
                <RoomIcon/>
                </Marker>
          </Map>;

        </div>

    );
  }

  export default App;
