const API_URL = `${process.env.REACT_APP_API_URL}/api/person`;

export const getPersons = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createPerson = async (person) => {
  console.log("Enviando:", JSON.stringify(person));

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person)

  });
  return res.json();
};

export const updatePerson = async (id, person) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person),
  });
  return res.json();
};

export const deletePerson = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};