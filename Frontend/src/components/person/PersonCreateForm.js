// src/components/person/PersonCreateForm.js
import { useState } from 'react';

export default function PersonCreateForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', email: '' });
  };

  return (
    <div className="mb-4">
      <h4>Crear Usuario</h4>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Correo"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Crear</button>
      </form>
    </div>
  );
}
