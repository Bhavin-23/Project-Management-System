import { useState, useEffect } from "react";
import api from "../api";

export default function ProjectForm({ onProjectCreated, editProject, onEditCompleted }) {
  const [form, setForm] = useState({ name: "", price: "", due_date: "", description: "" });

  useEffect(() => {
    if (editProject) setForm(editProject);
  }, [editProject]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProject) {
        await api.put(`/projects/${editProject._id}`, form);
        onEditCompleted();
      } else {
        await api.post("/projects", form);
        onProjectCreated();
      }
      setForm({ name: "", price: "", due_date: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-xl mb-4">
      <h2 className="text-xl font-bold mb-2">{editProject ? "Edit Project" : "Create Project"}</h2>
      <input name="name" placeholder="Project Name" value={form.name} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input name="due_date" type="date" value={form.due_date?.split('T')[0]} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <button className={`px-4 py-2 rounded ${editProject ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
        {editProject ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}
