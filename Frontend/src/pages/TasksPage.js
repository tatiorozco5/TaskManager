import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    const filtered = data.filter(task => task.status !== 'COMPLETADA');
    setTasks(filtered);
  };

  const handleSubmit = async (task) => {
    if (editing) {
      await updateTask(editing.id, task);
      setEditing(null);
    } else {
      await createTask(task);
    }
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <>
      <TaskForm onSubmit={handleSubmit} taskToEdit={editing} />
      <TaskList
        tasks={tasks}
        onEdit={setEditing}
        onDelete={handleDelete}
        onTaskUpdated={loadTasks}
      />
    </>
  );
}
