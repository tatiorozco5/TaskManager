import React from 'react';

const PersonList = ({ persons, onEdit, onDelete }) => {
  return (
    <div className="mt-5">
      <h4>Usuarios</h4>
      <div className="row">
        {persons.map((person) => (
          <div key={person.id} className="col-md-4 mb-4">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-person-circle "></i>{person.name}
                </h5>

                <p className="card-text">
                  <strong>Tareas asignadas:</strong> {person.tasks ? person.tasks.length : 0}
                </p>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => onEdit(person)}>
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(person.id)}>
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonList;
