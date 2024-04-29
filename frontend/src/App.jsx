import "./App.css";
import { SearchUsers } from "./components/SearchUsers.jsx";
import { AddUsers } from "./components/AddUsers.jsx";
import { UsersTable } from "./components/UsersTable.jsx";
import { useState } from "react";

// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

function App() {
  const [update, setUpdate] = useState(true);

  return (
    <>
      <SearchUsers />
      <AddUsers setUpdate={setUpdate} />
      <UsersTable update={update} setUpdate={setUpdate} />
    </>
  );
}

export default App;
