import { useEffect, useState } from 'react';
import { getPersons, createPerson, updatePerson, deletePerson } from '../services/personService';
import PersonList from '../components/person/PersonList';
import PersonCreateForm from '../components/person/PersonCreateForm';
import PersonEditForm from '../components/person/PersonEditForm';

export default function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    const data = await getPersons();
    setPersons(data);
  };

  const handleCreate = async (person) => {
    await createPerson(person);
    loadPersons();
  };

  const handleUpdate = async (person) => {
    await updatePerson(person.id, person);
    setEditing(null);
    loadPersons();
  };

  const handleDelete = async (id) => {
    await deletePerson(id);
    loadPersons();
  };

  return (
    <div className="container mt-4">
      {!editing ? (
        <PersonCreateForm onSubmit={handleCreate} />
      ) : (
        <PersonEditForm person={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
      )}
      <PersonList persons={persons} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}