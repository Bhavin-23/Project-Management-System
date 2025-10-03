import { useState, useEffect } from "react";
import api from "../api";

export default function TaskForm({ onTaskCreated, editTask, onEditCompleted }) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", project_id: "", due_date: "", description: "" });

  useEffect(() => { api.get("/projects").then(res => setProjects(res.data)); }, []);

  useEffect(() => {
    if (editTask) {
      setForm({
        name: editTask.name,
        project_id: editTask.project_id?._id || "",
        due_date: editTask.due_date?.split('T')[0],
        description: editTask.description
      });
    }
  }, [editTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, form);
        onEditCompleted();
      } else {
        await api.post("/tasks", form);
        onTaskCreated();
      }
      setForm({ name: "", project_id: "", due_date: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-xl mb-4">
      <h2 className="text-xl font-bold mb-2">{editTask ? "Edit Task" : "Create Task"}</h2>
      <input name="name" placeholder="Task Name" value={form.name} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <select name="project_id" value={form.project_id} onChange={handleChange} className="border p-2 w-full mb-2">
        <option value="">Select Project</option>
        {projects.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <button className={`px-4 py-2 rounded ${editTask ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
