import React, { useState } from "react";
import { EyeOpen } from "../assets/icons/EyeOpen";
import { EyeClose } from "../assets/icons/EyeClose";

export const AddUsers = (props) => {
  const { setUpdate } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex = /^[a-zA-Z0-9]+$/;

  const createUser = () => {
    fetch("http://localhost:3000/api/usuarios/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then((res) => {
      if (res.ok) {
        console.log("usuario creado");
        setUpdate(true);
        setName("");
        setEmail("");
        setPassword("");
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
      <div className="input-container">
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="button-eye"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
        {password.length < 8 && password.length > 0 && (
          <p>La contraseña debe tener mas de 8 caracteres</p>
        )}
        {!passwordRegex.test(password) && password.length > 0 && (
          <p>La contraseña solo debe llevar letras y números</p>
        )}
      </div>
      <button
        disabled={name === "" || email === "" || password === ""}
        onClick={createUser}
      >
        Guardar
      </button>
    </div>
  );
};
