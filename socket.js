const socket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on(("message"), msg => {
            io.emit("message", msg)
        })
    });
}

module.exports = socket;