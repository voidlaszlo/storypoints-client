const { EVENTS } = require("./constants");

const emit_JoinRoom = (socket, roomId) => {
  socket.emit(EVENTS.JOIN_ROOM, roomId);
};

const emit_GetState = (socket) => {
  socket.emit(EVENTS.GET_STATE);
};

const emit_PostData = (socket, data, roomId, cb) => {
  socket.emit(EVENTS.POST_DATA, data, roomId);
  cb();
};

const emit_PostTitle = (socket, titleInput) => {
  socket.emit(EVENTS.POST_TITLE, titleInput.current.value);
  titleInput.current.value = "";
};

const emit_clearState = (socket) => {
  socket.emit(EVENTS.CLEAR_STATE);
};

module.exports = {
  emit_JoinRoom,
  emit_GetState,
  emit_PostData,
  emit_PostTitle,
  emit_clearState,
};

/*
{
  uuid: {
    dataSets: [
      {
        title:'',
        data: [
          {
            socketId: '',
            selected:
          }
        ]
      }
    ]
  }
}

*/
