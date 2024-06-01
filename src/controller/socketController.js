
// io.on('connection', (socket) => {
//     console.log('a user connected');
  
//     socket.on('join', async (email) => {
//       let user = await User.findOneAndUpdate(
//         { email: email },
//         [ { $set: { "socketId" :  { $toString: socket.id } } } ],  // The $set stage is an alias for ``$addFields`` stage
//         { returnNewDocument: true }
//      )
//       // if (!user) {
//       //   user = new User({ email, socketId: socket.id });
//       //   await user.save();
//       // } else {
//         // user.socketId = socket.id;
//         // await user.save();
//       // }
//       console.log(user)
  
//       io.emit('user joined', {_id: user?._id,  email: user?.email, socketId: socket.id });
//     });
  
//     socket.on('disconnect', async () => {
//       const user = await User.find(socket.id);
//       console.log(user)
//       if (user) {
//         io.emit('user left', { email: user?._id });
//       }
//       console.log('user disconnected');
//     });
//   });

//   export {}