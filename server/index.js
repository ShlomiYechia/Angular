// const express = require('express');
// const http = require('http');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const io = require('socket.io');
// const Task = require('./model/taks.js');
// const mongoose = require('mongoose');
// const DBurl = "mongodb://127.0.0.1:27017/tasksDB";

// const app = express();
// const httpServer = http.createServer(app);

// const ioServer = io(httpServer,{
//     cors: {
//         origin: ['http://localhost:4200']
//     }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(cors());

// // const carRoute = require('./routes/carRoutes.js');
// // app.use('/cars',carRoute);
// const taksRoutes = require('./routes/taksRoutes.js');
// app.use('/tasks',taksRoutes);

// const userRoute = require('./routes/userRoutes.js');
// const { Socket } = require('dgram');
// app.use('/users',userRoute);


// ioServer.on('connection', (socket) => {
//     console.log('user connected');

//     socket.on('newTask', (massege) => {
//         ioServer.emit('newTask', massege); 
//     });
//     socket.on('ondelete', (task) => {
//         ioServer.emit('deleteTask', task); 
//             });
//     socket.on('disconnect', () => {
//         console.log('disconnected');
//     });
// });


// mongoose.connect(DBurl).then(()=>{

//     console.log("DB is connected")

    
//     const server = httpServer.listen(8080,function(){
//         const port = server.address().port;
//         console.log("App is listening on " + port)
//     })
// })
// .catch(error => console.log(error))
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');
const Task = require('./model/taks.js');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module

const DBurl = "mongodb://127.0.0.1:27017/tasksDB";

const app = express();
const httpServer = http.createServer(app);

const ioServer = io(httpServer, {
    cors: {
        origin: ['http://localhost:4200']
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const taksRoutes = require('./routes/taksRoutes.js');
app.use('/tasks', taksRoutes);

const userRoute = require('./routes/userRoutes.js');
app.use('/users', userRoute);

ioServer.on('connection', (socket) => {
    console.log('user connected');

    socket.on('newTask', (massege) => {
        ioServer.emit('newTask', massege);
    });

    socket.on('ondelete', (taskId) => {
        ioServer.emit('deleteTask', taskId);
    });
    // socket.on('deleteTask', (delTask) => {
    //     ioServer.emit('deleteTask',delTask);
    // });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});

mongoose.connect(DBurl).then(() => {
    console.log("DB is connected");

    app.use(express.static(path.join(__dirname, 'dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

    const server = httpServer.listen(8080, function () {
        const port = server.address().port;
        console.log("App is listening on " + port);
    });
}).catch(error => console.log(error));
