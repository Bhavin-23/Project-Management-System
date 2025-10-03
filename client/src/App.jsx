import { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [projectUpdated, setProjectUpdated] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [editTask, setEditTask] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Project Management System</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <ProjectForm 
            onProjectCreated={() => setProjectUpdated(!projectUpdated)}
            editProject={editProject}
            onEditCompleted={() => { setEditProject(null); setProjectUpdated(!projectUpdated); }}
          />
          <ProjectList 
            onProjectUpdated={projectUpdated} 
            onEditProject={(p) => setEditProject(p)}
          />
        </div>

        <div>
          <TaskForm 
            onTaskCreated={() => setTaskUpdated(!taskUpdated)}
            editTask={editTask}
            onEditCompleted={() => { setEditTask(null); setTaskUpdated(!taskUpdated); }}
          />
          <TaskList 
            onTaskUpdated={taskUpdated} 
            onEditTask={(t) => setEditTask(t)}
          />
        </div>
      </div>
    </div>
  );
}
