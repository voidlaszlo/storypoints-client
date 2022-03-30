import io from "socket.io-client";
import { useEffect, useState } from "react";
import { emit_PostData, emit_JoinRoom } from "./emitEvents";
import { EVENTS, POINTS } from "./constants";
import { useParams } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState([]);
  let { roomId } = useParams();

  useEffect(() => {
    emit_JoinRoom(socket, roomId);

    socket.on(EVENTS.POST_DATA_EVENT, (data) => {
      setState(data);
      setSelected(0);
    });

    socket.on(EVENTS.POST_TITLE_EVENT, (title) => {
      setTitle(title);

      if (title === "") {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1 className={`text-sm font-bold`}>User Story</h1>
      <h1 className="mt-1 h-20 flex items-center justify-center bg-blue-400 text-white text-2xl font-bold py-2 px-4 mb-1 rounded">
        {title ? title : "No title yet."}
      </h1>
      <h1 className={`mt-10 text-sm font-bold`}>Story Points</h1>
      <div className="mt-1 flex gap-1 justify-center">
        {POINTS.map((p, index) => (
          <div className="w-1/6" key={index}>
            <button
              className={
                selected === p
                  ? `w-full bg-blue-400 text-white font-bold py-2 px-4 rounded ${
                      disabled ? "opacity-50" : ""
                    }`
                  : `w-full bg-gray-500 text-white font-bold py-2 px-4 rounded ${
                      disabled ? "opacity-50" : ""
                    }`
              }
              disabled={disabled}
              onClick={() => setSelected(p)}
            >
              {p}
            </button>
          </div>
        ))}
      </div>
      <button
        className={`block w-1/3 text-xl mr-0 ml-auto mt-1 bg-blue-400 text-white font-bold py-2 px-4 rounded ${
          disabled ? "opacity-50" : ""
        }`}
        disabled={disabled}
        onClick={() => {
          emit_PostData(socket, selected, roomId, () => setDisabled(true));
        }}
      >
        Choose
      </button>
      <div>
        <h1 className={`mt-10 text-sm font-bold`}>Results</h1>
        <div className={`mt-1 flex flex-col gap-1`}>
          {state.map(({ socketId, selected }, index) => (
            <div className={`flex items-center gap-1`} key={index}>
              <p
                className={`w-5/6 bg-gray-500 opacity-50 text-sm text-white font-bold py-2 px-4 rounded`}
              >
                {socketId}
              </p>
              <p
                className={`w-1/6 bg-blue-400 text-sm text-white font-bold py-2 px-4 rounded text-center`}
              >
                {selected}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
