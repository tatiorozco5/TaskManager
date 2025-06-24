const API_URL = `process.env.REACT_APP_API_URL/api/tasks`;

export const getTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
};



export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  return res.json();
};
export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const getComments = async (taskId) => {
  const res = await fetch(`${API_URL}/comments/${taskId}`);
  return res.json();
};

export const addComment = async (taskId, content) => {
  const res = await fetch(`${API_URL}/comments/${taskId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.json();
};



