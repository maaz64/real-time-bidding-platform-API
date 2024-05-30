require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const User = require('./models/user');
const Bid = require('./models/bid');
const Item = require('./models/item');
const Notification = require('./models/notification');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);


io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('bid', async (data) => {
      const { ItemId, bidAmount, UserId } = data;
      const item = await Item.findByPk(ItemId);
      if (item && bidAmount > item.currentPrice) {
        const bid = await Bid.create({ bidAmount, ItemId, UserId });
        item.currentPrice = bidAmount;
        await item.save();
        io.emit('update', { ItemId, bidAmount });
  
        // Notify item owner
        const owner = await User.findByPk(item.userId);
        if (owner) {
          const message = `New bid of ${bidAmount} on your item "${item.name}"`;
          await Notification.create({ UserId: owner.id, message });
          io.to(owner.socketId).emit('notify', message); // Ensure you save the socket ID when a user connects
        }
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
