import { type Task } from "../types/Task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="px-4 py-4 rounded-lg border border-black flex flex-col">
      <h2 className="text-2xl font-bold">{task.title}</h2>
      <p>Description: {task.description}</p>
    </div>
  );
}
