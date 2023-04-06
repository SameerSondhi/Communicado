import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import "bootstrap/dist/css/bootstrap.min.css";


const Chat = () => {
    const [approval, setApproval] = useState(false)
    const [username, setUsername] = useState("")
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    const [socket] = useState(() => io(':8000'));

    useEffect(() => {

        console.log('Is this running?');
        // socket.on('Welcome', data => console.log(data));

        socket.on("post chat", (msg) => {
            setMessages(prevMsgState => [...prevMsgState, msg])
        })
        return () => socket.removeAllListeners();
    }, [socket]);

    const usernameHandler = (e) => {
        e.preventDefault()
        if (username) {
            setApproval(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        socket.emit("chat", {username:username, content:input})
        setInput("")
    }

    return (
        <div style={{backgroundColor:"#13121E"}}>
            <h1 style={{fontSize:"100px"}}>Your Conversation</h1>
            {
                !approval ?
                    <form onSubmit={usernameHandler}>
                        <label><h3>Please enter a username</h3></label>
                        <input type="text" className='form-control' style={{height:"50px", width:"600px", marginLeft:"450px", backgroundColor:"#34344B", border:"1px solid #34344B", color:"#e5b783"}} onChange={(e) => setUsername(e.target.value)} value={username} /> <br />
                        <button style={{width:"400px", backgroundColor:"#e5b783", color:"#34344B", height:"50px", alignItems:"center"}} className='btn btn-outline-dark'>Enter</button> <Link to="/" className='btn btn-outline-dark' style={{width:"400px", backgroundColor:"#e5b783", color:"#34344B", height:"50px", alignItems:"center"}}><p style={{color:"#13121E", marginTop:"5px"}}>Back</p></Link>
                    </form> :
                    <div className='chat-input'>
                    <div className='chat'>
                        <div className='card text-center'>
                        <div className='card-header' style={{backgroundColor:"#13121E", color:"#e5b783", borderBottom:"1px solid #D2D2D2"}}>
                            Your Messages
                        </div>
                        <div className='card-body' style={{backgroundColor:"#13121E"}}>
                            {
                                messages.map((msg,i)=>(<div style={{display:"inline-block", border:"2px solid grey", borderRadius:"10px", width:"800px", height:"75px", marginBottom:"10px", backgroundColor:"#34344B"}}><p style={{marginRight:"300px", width:"200px"}}>{msg.username} said: </p>
                                <p key={i} style={{marginLeft:"150px"}}>{msg.content}</p>
                                </div>))
                            }
                        </div>
                        <form onSubmit={submitHandler} style={{display:"flex", backgroundColor:"#13121E", paddingBottom:"10px"}}>
                        <input type="text" className='form-control' style={{width:"400px", marginLeft:"450px", backgroundColor:"#34344B", border:"1px solid #34344B", color:"#e5b783"}} onChange={(e) => setInput(e.target.value)} value={input} /> 
                        <button style={{width:"100px", height:"39px", marginLeft:"5px", marginRight:"5px", backgroundColor:"#e5b783", color:"#34344B"}} className='btn btn-outline-dark'>Send</button>  <Link to="/" className='btn btn-outline-dark' style={{backgroundColor:"#e5b783", color:"#34344B"}}>Leave Chat</Link>
                        </form>
                       
                        
                        <div className='card-footer' style={{backgroundColor:"#13121E", color:"#e5b783", borderTop:"1px solid #D2D2D2"}}>
                            Keep Chatting!
                        </div>
                    </div>
                    </div>
                    </div>
            }
        </div>
    )
}

export default Chat