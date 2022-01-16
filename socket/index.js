const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

//remove user
const removeUser = (socketId) => {
    console.log("socketId", socketId);
    console.log("users", users)
    users = users.filter((user) => user.socketId !== socketId);
}

//add user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

io.on("connection", (socket) => {
    console.log("a user connected");

    //take userId anh socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });


    //disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnect");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })

    //getMessage
    socket.on("addMessage", (message) => {
        io.emit("getMessage", message);
    })

    //getNotification
    socket.on("addNewPost", (newPost) => {
        io.emit("getNewPost", newPost);
    })
})