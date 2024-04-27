import { useEffect, useState } from "react";
import "./App.css";

// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

function App() {
  const [users, setUsers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const editUser = (id, newName, newEmail) => {
    fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail }),
    }).then((res) => {
      if (res.ok) {
        console.log("Usuario editado");
        setUsers(res.json());
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

  //console.log(name);
  //console.log(email);

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
                  <button onClick={openModal}>Editar</button>
                  <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>
                <button>X</button>
              </span>
              <h2>Editar Usuario</h2>
              <input type="text" value={name} placeholder="Nombre" />
              <input type="text" value={email} placeholder="Email" />
              <button onClick={() => editUser(newEmail, newName, id)}>
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
