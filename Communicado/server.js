const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const cors = require('cors')

require('./server/config/mongoose.config');

require('dotenv').config();


const Routes = require('./server/routes/user.routes')
Routes(app);

app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new


const port = 8000;
    
const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );

const myFirstSecret = process.env.SECRET_KEY;

const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const io = require('socket.io')(server, { cors: true });

io.on("connection", socket =>{
    console.log(socket.id)
    
    socket.on("chat", client_input =>{
        console.log("Got an input", client_input)
        io.emit("post chat", client_input)
    });
});

