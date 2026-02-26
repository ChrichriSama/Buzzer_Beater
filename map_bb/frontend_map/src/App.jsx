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
import Register from './components/Register';
import Login from './components/Login';


  function App() {
    const myStorage = window.localStorage;
    const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
    const [pins, setPins]= useState([]);
    const [currentPlaceId,setCurrentPlaceId] = useState(null);

    // Create new place
    const [newPlace,setnewPlace] = useState(null);
    const [Title,setTitle] = useState("");
    const [Desc,setDesc] = useState("");
    const [Rating,setRating] = useState(0);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [viewport, setViewport] = useState({
      width: "100vw",
      height: "100vh",
      latitude: 48.858370,
      longitude: 2.294481 ,
      zoom: 16,
    });
    useEffect(() => {
      const getPins = async ()=>{
        try {
          const res = await axios.get("/api/pins");
          console.log(res.data)
          setPins(res.data)
          console.log(res.data)

        }catch(err){
          console.error("Issue with getting all pins (getPins function)",err)
        }
      };
      getPins()
    },[]);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const userFromUrl = params.get('user');
      if (userFromUrl) {
        setCurrentUser(userFromUrl);
        myStorage.setItem('user', userFromUrl);
        window.history.replaceState(null, '', '/');
      }
    }, []);


    const handleMarkerClick = (id, lat, long)=>{
      setCurrentPlaceId(id);
      setViewport({...viewport, latitude: lat, longitude: long})
     };

    const handleAddClick = (e) => {
      if (!currentUser) {
        setShowLogin(true);
        return;
      }
      const {lng, lat} = e.lngLat;
      setnewPlace({
        lat: lat,
        lng: lng,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newPin={
        username:currentUser,
        title: Title,
        desc: Desc,
        rating: Rating,
        lat:newPlace.lat,
        long:newPlace.lng,
      }

      try{
        const res = await axios.post("/api/pins", newPin)
        setPins([...pins,res.data])
        setnewPlace(null)
      }catch(err){
        console.log("Error with adding a new Pin: "+ err)
      }


    };

    const handleLogout = () => {
      myStorage.removeItem("user");
      setCurrentUser(null);
      // Vide aussi la session sur localhost:3000 et redirige vers login
      window.location.href = 'http://localhost:3000/pgs_prjts/login.html?logout=1';
    }

    return (
        <div className="App">
          {currentUser ? (
                  <div className='navbar'>
                  <a className='button nav-link' href='http://localhost:3000/pgs_prjts/bb_menu.html'>Accueil</a>
                  <a className='button nav-link' href={`http://localhost:3000/pgs_prjts/bb_forum.html?user=${encodeURIComponent(currentUser)}`}>Forum</a>
                  <span className='button nav-user'>{currentUser}</span>
                  <button className='button logout' onClick={handleLogout}>Déco</button>
                  </div>
              ) : (<div className='navbar'>
                  <a className='button nav-link' href='http://localhost:3000/pgs_prjts/bb_menu.html'>Accueil</a>
                  <a className='button nav-link' href='http://localhost:3000/pgs_prjts/bb_forum.html'>Forum</a>
                  <button className='button login' onClick={()=>setShowLogin(true)}>Connexion</button>
                  <button className='button register' onClick={()=>setShowRegister(true)}>Créer compte</button>
                </div>)}
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX}
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            mapStyle="mapbox://styles/loey25/cmlif4xol002u01sk7h2xbcpl"
            style={{width: "100vw", height: "100vh"}}
            onDblClick={handleAddClick}
            doubleClickZoom={false}
            transitionDuration="2000"
            >
              {pins.map((p) => (
                <>
                  <Marker longitude={p.long} latitude={p.lat} anchor="bottom"
                    offsetTop={visualViewport.zoom *2}
                    offsetLeft = {-visualViewport.zoom *2}
                  // Prevent the click event from bubbling up to the map (which would close the popup immediately)
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handleMarkerClick(p._id, p.lat, p.long);
                  }} >
                    <RoomIcon
                      style={{color: p.username === currentUser ? "red" : "#4c34eb", fontSize: visualViewport.zoom *2, cursor: "pointer" }}
                    />
                  </Marker>
                  {p._id === currentPlaceId && (
                    <Popup longitude={p.long} latitude={p.lat}

                      anchor="bottom"
                      onClose={() => setCurrentPlaceId(null)}
                      >
                      <div className='card'>
                        <label>Place</label>
                        <h4 className='place'>{p.title}</h4>
                        <label>Address</label>
                        <p>{p.address}</p>
                        <label>Review </label>
                        <p className='desc'>{p.desc}</p>
                        <label>Rating</label>
                        <div className="stars">
                          {/* create an array of size p.rating and fill it with <StarIcon className="star"/> */}
                          {Array(p.rating).fill(<StarIcon className="star"/>)}
                        </div>
                        <span className="username">Created by <b>{p.username}</b></span>
                        <br></br>
                        <span className="date"> {format(p.createdAt)}</span>
                      </div>
                    </Popup>)

                  }
                </>
              ))}
              {newPlace && (
                <Popup longitude={newPlace.lng} latitude={newPlace.lat}
                      anchor="bottom"
                      onClose={() => setnewPlace(null)}
                      >
                      <div className='card'>
                        <form onSubmit = {handleSubmit}>
                         
                          <label>Place</label> 
                          <input placeholder='Enter a Place' onChange={(e)=>setTitle(e.target.value)}/>
                          <label>Review</label>
                          <textarea placeholder='How is this playground?' onChange={(e)=>setDesc(e.target.value)}/>
                          <label>Rating</label>
                          <select onChange={(e)=>setRating(e.target.value)}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                          </select>
                          <button className="submitButton" type = "submit">Add Pin</button>
                        </form>
                      </div>

                    </Popup>
                )}
                
          </Map>
          { showRegister &&  <Register setShowRegister={setShowRegister}/>}
          { showLogin &&  <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
        </div>

    );
  }

  export default App;

  //1:21:01