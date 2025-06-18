import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, taskToEdit }) {
  const [form, setForm] = useState({ title: '', description: '' });
  const [storyPoints, setStoryPoints] = useState(1);
  const [status, setStatus] = useState('SIN_INICIAR');

  useEffect(() => {
    if (taskToEdit) {
      setForm({ title: taskToEdit.title, description: taskToEdit.description });
      setStoryPoints(taskToEdit.storyPoints || 1);
      setStatus(taskToEdit.status || 'SIN_INICIAR');
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...form,
      storyPoints,
      status,
    };
    onSubmit(newTask);
    setForm({ title: '', description: '' });
    setStoryPoints(1);
    setStatus('SIN_INICIAR');
  };

  return (
    <div className="container mt-4">
      <h4>{taskToEdit ? 'Actualizar Tarea' : 'Crear Nueva Tarea'}</h4>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Título"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Descripción"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Puntos de Historia</label>
          <select
            className="form-select"
            value={storyPoints}
            onChange={(e) => setStoryPoints(parseInt(e.target.value))}
          >
            {[1, 2, 3, 5, 8, 13].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="SIN_INICIAR">Sin iniciar</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="DETENIDA">Detenida</option>
            <option value="COMPLETADA">Completada</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {taskToEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}
