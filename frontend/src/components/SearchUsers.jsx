import React, { useState } from "react";

export const SearchUsers = () => {
  const [findUser, setFindUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const searchUser = () => {
    fetch(`http://localhost:3000/api/usuarios/${idUser}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) {
          setFindUser(data[0]);
          setIdUser("");
          setIsSearch(false);
        } else {
          setFindUser({});
          setIsSearch(true);
          throw console.error("Usuario no encontrado");
        }
      });
  };

  return (
    <div>
      <h2>Buscar usuario por ID</h2>
      <input
        value={idUser}
        onChange={(e) => setIdUser(e.target.value)}
        type="number"
      />
      <button disabled={idUser === ""} onClick={searchUser}>
        Buscar
      </button>
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
      {isSearch && (
        <div>
          <p>No se encontró el usuario</p>
        </div>
      )}
    </div>
  );
};
