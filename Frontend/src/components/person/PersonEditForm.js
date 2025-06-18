import { useState, useEffect } from 'react';

export default function PersonEditForm({ person, onSubmit, onCancel }) {
  const [form, setForm] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    if (person) {
      setForm({
        id: person.id ?? '',
        name: person.name ?? '',
        email: person.email ?? '',
      });
    }
  }, [person]);

  useEffect(() => {
    setForm(person);
  }, [person]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="mb-4">
      <h4>Editar Usuario</h4>
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

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Actualizar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
