import { useState } from "react";
import { Link } from "react-router-dom";

function Start() {
  const [roomId, setRoomId] = useState("");

  return (
    <>
      <input
        placeholder="roomId"
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Link
        to={`/${roomId}`}
        key={`${roomId}`}
        className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded"
      >
        join
      </Link>
      <Link
        to="/admin"
        className="ml-1 w-full bg-red-400 text-white font-bold py-2 px-4 rounded"
      >
        create
      </Link>
    </>
  );
}

export default Start;
