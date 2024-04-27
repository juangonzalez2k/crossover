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

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [findUser, setFindUser] = useState("");
  const [idUser, setIdUser] = useState("");

  const [selectedUser, setSelectedUser] = useState({});

  const createUser = () => {
    fetch("http://localhost:3000/api/usuarios/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email }),
    }).then((res) => {
      if (res.ok) {
        console.log("usuario creado");
        setUpdate(true);
        setName("");
        setEmail("");
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
        setUpdate(true);
      } else {
        throw console.error("Error al editar el usuario");
      }
    });
  };

  const searchUser = () => {
    fetch(`http://localhost:3000/api/usuarios/${idUser}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) {
          setFindUser(data[0]);
          setIdUser("");
        } else {
          throw console.error("Usuario no encontrado");
        }
      });
  };

  // console.log(newName);
  // console.log(newEmail);

  const handleOpenModal = (user) => {
    setSelectedUser(user.id);
    setNewName(user.name);
    setNewEmail(user.email);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar a la función editUser con los nuevos valores
    editUser(selectedUser, newName, newEmail);
    // Limpiar los campos después de editar
    setNewName("");
    setNewEmail("");
    setSelectedUser("");
    closeModal();
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
  //console.log(findUser);

  return (
    <>
      <div>
        <h2>Buscar usuario por ID</h2>
        <input
          value={idUser}
          onChange={(e) => setIdUser(e.target.value)}
          type="number"
        />
        <button onClick={searchUser}>Buscar</button>
        {Object.keys(findUser).length !== 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{findUser.id}</td>
                  <td>{findUser.name}</td>
                  <td>{findUser.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

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
                  <button onClick={() => handleOpenModal(user)}>Editar</button>
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
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nuevo Nombre"
              />
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Nuevo Email"
              />
              <button onClick={handleSubmit}>Guardar Cambios</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
