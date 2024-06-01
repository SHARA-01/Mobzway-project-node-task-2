import express from "express";
import registerUser from "./controller/contoller.js";
import DatabaseData from "./controller/GetData.js";
import path from 'node:path'
import http from 'node:http'
import bodyParser from "body-parser";
import { formatDate } from "./controller/dateFormate.js";
import { fileURLToPath } from 'url'
import { Server } from 'socket.io'
import { User } from "./models/user.model.js";
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());

// middle ware for date fromat
app.use((req, res, next) => {
  res.locals.formatDate = formatDate;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'User Register' });
});

app.get('/data', async (req, res) => {
  let data = await DatabaseData();
  if (data.ok) {
    data = data.data;
  }
  res.render('DataDisplay', { title: 'Atlas Database', data });
});

app.get('/room/user/:email', async (req, res) => {
  const email = req.params.email;
  res.render("ChatRoom", { title: "Chat Room", email: email })
})

app.get('/room', (req, res) => {
  res.render('room', { title: "Join a room." })
})

app.post('/user', registerUser)

app.get('/user/:id', async (req, res) => {
  const user = await User.find({ email: req.params.id });
  res.send(user)
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', async (email, next) => {
    let user = await User.findOneAndUpdate({ email: email }, [{ $set: { "socketId": socket.id } }])
    let Alluser = await User.find();
    let joinedUser = Alluser.filter(item => item?.email === `${user?.email}`)
    io.emit('user joined', { user: Alluser, joinedUser: joinedUser[0], id: socket.id });
  });

  socket.on('disconnect', async () => {
    const username = await User.find({ socketId: socket.id })
    const user = await User.updateOne({ socketId: socket.id }, { $unset: { socketId: '' } });
    if (user) {
      io.emit('user left', { full_name: `${username[0]?.first_name} ${username[0]?.last_name}`, socketId: socket.id });
    }
    console.log('user disconnected');
  });
});

export { app, server, io, User };
