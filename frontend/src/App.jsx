import { useEffect, useState } from "react";
import "./App.css";

// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

function App() {
  const [users, setUsers] = useState([]);

  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createUser = () => {
    fetch("http://localhost:3000/api/usuarios/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email }),
    }).then((res) => {
      if (res.ok) {
        console.log("usuario creado");
        setUpdate(true);
      }
    });
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        console.log("usuario eliminado");
        setUpdate(true);
      }
    });
  };

  useEffect(() => {
    const getUsers = () => {
      fetch("http://localhost:3000/api/usuarios", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setUsers(data));
    };
    getUsers();
  }, [update]);

  console.log(name);
  console.log(email);

  return (
    <>
      <div className="create-container">
        <h1>Ingresar Usuario</h1>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Guardar</button>
      </div>

      <div className="table-container">
        <h1>Usuarios</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button>Editar</button>
                  <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
