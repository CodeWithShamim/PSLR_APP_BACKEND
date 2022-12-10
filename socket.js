const socket = (io) => {
    let users = [];

    const addUser = (userId, socketId) => {
        const isExits = users.some((user) => user.userId === userId);
        if (!isExits) users.push({ userId, socketId })
    }
    const getUser = (userId) => {
        return users.find((user) => user.userId === userId)
    }
    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    }

    io.on('connection', (socket) => {
        console.log("user connected...");

        // add user 
        socket.on(("addUser"), userId => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)
        })

        // send message 
        socket.on("sendMessage", data => {
            let user;

            user = getUser(data.senderId)
            io.to(user?.socketId).emit("getMessage", data)
            user = getUser(data.receiverId)
            if (user?.socketId) io.to(user.socketId).emit("getMessage", data)
        })

        // remove user 
        socket.on('disconnect', () => {
            console.log("user Disconnected...");
            removeUser(socket.id)
            io.emit("getUsers", users)
        });
    });
}

module.exports = socket;