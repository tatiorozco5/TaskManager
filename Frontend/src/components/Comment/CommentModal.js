import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getComments, addComment } from '../../services/taskService';

const CommentModal = ({ show, onClose, task }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (task && show) {
      loadComments(task.id);
    }
  }, [task, show]);

  const loadComments = async (taskId) => {
    try {
      const data = await getComments(taskId);
      setComments(data);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment(task.id, newComment);
      setNewComment('');
      loadComments(task.id);
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comentarios de: {task?.title}</Modal.Title>
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
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAddComment} disabled={!newComment.trim()}>
          Agregar Comentario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
