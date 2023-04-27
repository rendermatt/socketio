import { useState } from "react";
import socket from "../socket";

const MyForm = () => {
  const [value, setValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    socket.emit("frontendToBackend", value);
    setValue("");
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
