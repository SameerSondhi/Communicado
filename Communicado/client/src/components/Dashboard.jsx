import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../App.css';

const Dashboard = () => { 
    return (
        <div style={{backgroundColor:"#13121E"}}>
        <h1 style={{fontSize:"100px"}}>Welcome to Communicado</h1> <br />

        <h3>Invite your friends and use this free platform to start the group chats you've always wanted to</h3> <br />

        <h3>Click the button below to get started!</h3><br />
        <Link to="/chat" className='btn btn-outline-dark' style={{backgroundColor:"#e5b783", color:"#34344B", height:"50px", width:"400px", alignItems:"center"}}><p style={{color:"#13121E", marginTop:"5px"}}>Enter a Chat Room</p></Link>
        </div>
    )
}
export default Dashboard

{/* <h5>Here's how to get started</h5>
<p>After clicking in the button below, you will enter the chat room and input your username of choice</p>
<p>After that, go ahead and share your IP address with your friends and have them also enter the chat room</p> 
<p>You are now able to test out this seamless chatting platform that you can integrate into your next website or application!</p> */}