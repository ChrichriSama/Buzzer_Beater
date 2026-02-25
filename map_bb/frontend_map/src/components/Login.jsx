import { useState } from 'react';
import { useRef } from 'react';
import './login.css'
import axios from "axios"
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ClearIcon from '@mui/icons-material/Clear';

export default function Login({setShowLogin, myStorage, setCurrentUser}){

    const [fail, setFail]= useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()
    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };

        try{
            const res = await axios.post("/api/users/login", user);
            myStorage.setItem("user", res.data.username )
            setCurrentUser(res.data.username)
            setFail(false);
            setShowLogin(false);
        }catch(err){
            setFail(true); 
            console.log("Error with Login: " + err)};
    }
    return(
        <div className='loginContainer'>x
            <div className='logo'>
                <SportsBasketballIcon/>
                Welcome
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="username" placeholder='username' ref={nameRef}/>
                    <input type="password" placeholder = 'password' ref={passwordRef}/>
                    <button className='loginButton'>Login</button>
                    {fail && <span className='flop'>Oups, Sorry but something went wrong...</span>}
                </form>
                <ClearIcon className='loginCancel' onClick= {()=> setShowLogin(false)}/>

        </div>
    )
}