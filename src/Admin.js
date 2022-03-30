import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { emit_clearState, emit_GetState, emit_PostTitle } from "./emitEvents";
import { EVENTS } from "./constants";
import { CSVLink } from "react-csv";

const socket = io.connect("http://localhost:3001");

const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"],
];

function Admin() {
  const [title, setTitle] = useState("");
  const [state, setState] = useState([]);
  const titleInput = useRef(null);

  useEffect(() => {
    socket.on(EVENTS.POST_DATA_EVENT, (data) => {
      setState(data);
    });

    socket.on(EVENTS.POST_TITLE_EVENT, (title) => {
      setTitle(title);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Room ID: {socket.id}</h1>
      <h1 className={`text-sm font-bold`}>
        User Story{" "}
        <button
          onClick={() => emit_clearState(socket)}
          className={`text-xs mr-0 ml-auto bg-red-400 text-white py-1 px-2 rounded`}
        >
          CLEAR
        </button>
      </h1>
      <h1 className="mt-1 h-20 flex items-center justify-center bg-blue-400 text-white text-2xl font-bold py-2 px-4 mb-1 rounded">
        {title ? title : "No title yet."}
      </h1>
      <div>
        <input
          placeholder="..."
          className={`focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border text-gray-500 sm:text-sm rounded-md`}
          ref={titleInput}
        />
        <button
          onClick={() => {
            emit_PostTitle(socket, titleInput);
          }}
          className={`ml-1 text-xs mr-0 ml-auto bg-red-400 text-white py-1 px-2 rounded`}
        >
          SET
        </button>
      </div>
      <div>
        <h1 className={`mt-10 text-sm font-bold`}>
          Results{" "}
          <button
            onClick={() => emit_GetState(socket)}
            className={`text-xs mr-0 ml-auto bg-red-400 text-white py-1 px-2 rounded`}
          >
            GET
          </button>
        </h1>
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
      <CSVLink
        data={csvData}
        className={`text-xs mr-0 ml-auto bg-red-400 text-white py-1 px-2 rounded`}
      >
        Download Excel
      </CSVLink>
    </div>
  );
}

export default Admin;
