import { useState, useEffect } from 'react';
import Map from 'react-map-gl/mapbox';
import {Marker} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';
import  {Popup} from 'react-map-gl/mapbox';
import StarIcon from '@mui/icons-material/Star';
import './app.css';
import axios from "axios"
import {format} from "timeago.js"

  function App() {
    const currentUser = "yanis75"
    const [pins, setPins]= useState([])
    const [currentPlaceId,setCurrentPlaceId] = useState(null)

    // Create new place
    const [newPlace,setnewPlace] = useState(null)

    useEffect(() => {
      const getPins = async ()=>{
        try {
          const res = await axios.get("/api/pins");
          setPins(res.data)
          console.log(res.data)

        }catch(err){
          console.error("Issue with getting all pins (getPins function)",err)
        }
      };
      getPins()
    },[]);


    const handleMarkerClick = (id)=>{
      setCurrentPlaceId(id);
     };
    return (
        <div className="App">

          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX}
            initialViewState={{
              longitude: 2.294481,
              latitude: 48.858370,
              zoom: 16
            }}
            mapStyle="mapbox://styles/loey25/cmlif4xol002u01sk7h2xbcpl"
            style={{width: "100vw", height: "100vh"}}
            >
              {pins.map((p) => (
                <>
                  <Marker longitude={p.long} latitude={p.lat} anchor="bottom"

                  // Prevent the click event from bubbling up to the map (which would close the popup immediately)
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handleMarkerClick(p._id);
                  }} >
                    <RoomIcon
                      style={{color: p.username === currentUser ? "red" : '#5e17eb', fontSize: visualViewport.zoom, cursor: "pointer" }}
                    />
                  </Marker>
                  {p._id === currentPlaceId && (
                    <Popup longitude={p.long} latitude={p.lat}
                      anchor="top"
                      onClose={() => setCurrentPlaceId(null)}
                      >
                      <div className='card'>
                        <label>Place</label>
                        <h4 className='place'>{p.title}</h4>
                        <label>address</label>
                        <p>{p.address}</p>
                        <label>Review </label>
                        <p className='desc'>{p.desc}</p>
                        <label>Rating</label>
                        <div className="stars">
                          <StarIcon className="star"/>
                          <StarIcon className="star"/>
                          <StarIcon className="star"/>
                          <StarIcon className="star"/>
                          <StarIcon className="star"/>
                        </div>
                        <span className="username">Created by <b>{p.username}</b></span>
                        <br></br>
                        <span className="date"> {format(p.createdAt)}</span>
                      </div>
                    </Popup>)
                  }
                </>
              ))}
          </Map>

        </div>

    );
  }

  export default App;
