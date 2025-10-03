import { useEffect, useState } from "react";
import api from "../api";

export default function ProjectList({ onProjectUpdated, onEditProject }) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  useEffect(() => { fetchProjects(); }, [onProjectUpdated]);

  return (
    <div className="bg-white p-4 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-2">Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p._id} className="flex justify-between border-b py-2">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">Due: {new Date(p.due_date).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEditProject(p)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => deleteProject(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
