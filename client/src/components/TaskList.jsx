import { useEffect, useState } from "react";
import api from "../api";

export default function TaskList({ onTaskUpdated, onEditTask }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, [onTaskUpdated]);

  return (
    <div className="bg-white p-4 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-2">Tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t._id} className="border-b py-2 flex justify-between items-start">
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">Project: {t.project_id?.name}</p>
              <p className="text-sm text-gray-500">Due: {new Date(t.due_date).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEditTask(t)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
