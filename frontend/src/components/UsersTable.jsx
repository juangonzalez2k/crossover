import React from "react";
import { useEffect, useState } from "react";
import { Edit } from "../assets/icons/Edit.jsx";
import { Delete } from "../assets/icons/Delete.jsx";
import { EyeOpen } from "../assets/icons/EyeOpen";
import { EyeClose } from "../assets/icons/EyeClose";

export const UsersTable = (props) => {
  const { update, setUpdate } = props;
  const [users, setUsers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedUser, setSelectedUser] = useState({});

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        console.log("usuario eliminado");
        setUpdate(true);
        closeDelete(true);
      }
    });
  };

  const editUser = (id, newName, newEmail, newPassword) => {
    let body = { name: newName, email: newEmail };
    if (newPassword.length >= 8) {
      body.password = newPassword;
    }
    fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        password: newPassword,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("Usuario editado");
        setUpdate(true);
      } else {
        throw console.error("Error al editar el usuario");
      }
    });
  };

  const closeDelete = () => {
    setSelectedUser({});
    setIsOpenDelete(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user.id);
    setNewName(user.name);
    setNewEmail(user.email);
    setIsOpen(true);
  };

  const handleOpenModalDelete = (user) => {
    setSelectedUser(user.id);
    setIsOpenDelete(true);
  };

  const handleSubmit = () => {
    editUser(selectedUser, newName, newEmail, newPassword);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setSelectedUser("");
    closeModal();
  };

  const passwordRegex = /^[a-zA-Z0-9]+$/;

  useEffect(() => {
    const getUsers = () => {
      fetch("http://localhost:3000/api/usuarios", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setUsers(data), setUpdate(false));
    };
    if (update) {
      getUsers();
    }
  }, [update]);

  return (
    <div className="table-container">
      <h1>Usuarios</h1>
      <table className="table-all-container">
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
              <td className="td-container">
                <button
                  className="button-edit"
                  onClick={() => handleOpenModal(user)}
                >
                  <Edit>Editar</Edit>
                </button>
                <button
                  className="button-delete"
                  onClick={() => handleOpenModalDelete(user)}
                >
                  <Delete>Eliminar</Delete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDelete && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeDelete}>
              <button>X</button>
            </span>
            <h2>¿Estas seguro que deseas eliminar el usuario?</h2>
            <button onClick={() => deleteUser(selectedUser)}>Confirmar</button>
            <button onClick={closeDelete}>Cancelar</button>
          </div>
        </div>
      )}
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
            <div className="input-container">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nueva Contraseña"
                />
                <button
                  className="button-eye"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
              {newPassword.length < 8 && newPassword.length > 0 && (
                <p>La contraseña debe tener mas de 8 caracteres</p>
              )}
              {!passwordRegex.test(newPassword) && newPassword.length > 0 && (
                <p>La contraseña solo debe llevar letras y números</p>
              )}
            </div>
            <button onClick={handleSubmit}>Guardar Cambios</button>
          </div>
        </div>
      )}
    </div>
  );
};
