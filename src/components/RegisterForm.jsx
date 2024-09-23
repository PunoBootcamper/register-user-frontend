// src/components/RegisterForm.jsx
import React, { useState } from "react";
import "./form.css"; // Importar estilos
import { registerUser } from "../utils/api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    profilePicture: "",
    address: "",
    contactNumber: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

    try {
      const response = await registerUser(formData);
      if (response.message === "Usuario registrado con éxito") {
        setSuccess("¡Registro exitoso!");
      } else {
        setError("Error al registrar el usuario. Inténtalo nuevamente.");
      }
    } catch (error) {
      setError("Hubo un problema con el servidor.");
    }
  };

  return (
    <div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profilePicture"
          onChange={(e) =>
            setFormData({ ...formData, profilePicture: e.target.files[0] })
          }
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contactNumber"
          placeholder="Número de contacto"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
