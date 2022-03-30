const { EVENTS } = require("./constants");

const Emit = {
  joinRoom: (socket, roomId) => {
    socket.emit(EVENTS.JOIN_ROOM, roomId);
  },
  getState: (socket) => {
    socket.emit(EVENTS.GET_STATE);
  },
  postData: (socket, data, roomId, cb) => {
    socket.emit(EVENTS.POST_DATA, data, roomId);
    cb();
  },
  postTitle: (socket, titleInput) => {
    socket.emit(EVENTS.POST_TITLE, titleInput.current.value);
    titleInput.current.value = "";
  },
  clearState: (socket) => {
    socket.emit(EVENTS.CLEAR_STATE);
  },
};

module.exports = {
  Emit,
};
