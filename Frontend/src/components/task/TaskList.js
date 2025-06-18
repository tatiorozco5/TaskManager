import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getTasks, getComments, addComment, updateTask,  } from '../../services/taskService';

const TaskList = ({onTaskUpdated}) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      const filtered = data.filter(task => task.status !== 'COMPLETADA');
      setTasks(filtered);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  const loadComments = async (taskId) => {
    try {
      const data = await getComments(taskId);
      setComments(data);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  const handleShowEditModal = (task) => {
    setSelectedTask(task);
    setEditForm({ title: task.title, description: task.description });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTask = {
        ...selectedTask,
        title: editForm.title,
        description: editForm.description,
      };

      await updateTask(selectedTask.id, updatedTask);
      setShowEditModal(false);
      await loadTasks();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const handleShowComments = async (task) => {
    setSelectedTask(task);
    setNewComment('');
    await loadComments(task.id);
    setShowModal(true);
  };

  const handleChangeStatus = async (task, newStatus) => {
    try {
      const updatedTask = {
        ...task,
        status: newStatus,
      };

      await updateTask(task.id, updatedTask);

      const estadoTexto = {
        SIN_INICIAR: "Sin iniciar",
        PENDIENTE: "Pendiente",
        DETENIDA: "Detenida",
        COMPLETADA: "Completada"
      };

      await addComment(task.id, `Estado actualizado a ${estadoTexto[newStatus] || newStatus}`);
      onTaskUpdated();
      await loadTasks();
    } catch (error) {
      console.error('Error al cambiar estado de tarea:', error);
    }

  };


  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment(selectedTask.id, newComment);
      setNewComment('');
      await loadComments(selectedTask.id); // recarga los comentarios
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'COMPLETADA':
        return 'bg-success';
      case 'PENDIENTE':
        return 'bg-warning text-dark';
      case 'DETENIDA':
        return 'bg-danger';
      case 'SIN_INICIAR':
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Tareas</h2>
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-4">
            <div className="card shadow-sm border-secondary">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p><strong>Asignado a:</strong> {task.assigneeName}</p>

                <Form.Select
                  className="mt-2"
                  value={task.status}
                  onChange={(e) => handleChangeStatus(task, e.target.value)}
                >
                  <option value="SIN_INICIAR">Sin iniciar</option>
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="DETENIDA">Detenida</option>
                  <option value="COMPLETADA">Completada</option>
                </Form.Select>


                <div className="mt-3">
                  <Button variant="info" size="sm" onClick={() => handleShowComments(task)}>
                    Ver Comentarios
                  </Button>
                </div>
                <div className="mt-3">
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(task)}>
                    Editar
                  </Button>

                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal de Comentarios */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comentarios de: {selectedTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-2 p-2 border rounded bg-light">
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                  <div>{comment.content}</div>
                </div>
              ))
            ) : (
              <p className="text-muted">Sin comentarios aún.</p>
            )}
          </div>

          <Form.Group controlId="newComment">
            <Form.Label>Agregar nuevo comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddComment} disabled={!newComment.trim()}>
            Agregar Comentario
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
