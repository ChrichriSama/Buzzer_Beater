import { useState } from 'react';
import { useRef } from 'react';
import './register.css'
import axios from "axios"
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ClearIcon from '@mui/icons-material/Clear';

export default function Register({setShowRegister}){
    const [success, setSuccess]= useState(false)
    const [fail, setFail]= useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try{
            const res = await axios.post("/api/users/register", newUser);
            setFail(false);
            setSuccess(true);
        }catch(err){
            setFail(true);
            console.log("Error with Registration: " + err)};
    }
    return(
        <div className='registerContainer'>x
            <div className='logo'>
                <SportsBasketballIcon/>
                Welcome
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="username" placeholder='username' ref={nameRef}/>
                    <input type="email" placeholder='email' ref={emailRef}/>
                    <input type="password" placeholder = 'password' ref={passwordRef}/>
                    <button className='registerButton'>Register</button>
                    {success && <span className='success'>Successful. You can now login!</span>}
                    {fail && <span className='flop'>Oups, Sorry but something went wrong...</span>}
                </form>
                <ClearIcon className='registerCancel' onClick= {()=> setShowRegister(false)}/>

        </div>
    )
}