import React, { useState } from "react";

export const AddUsers = (props) => {
  const { setUpdate } = props;
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
        setName("");
        setEmail("");
      }
    });
  };

  return (
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
  );
};
