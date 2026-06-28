import TaskCard from "./TaskCard";
import { type Task } from "../types/Task";
import { useEffect, useState } from "react";

export default function TasksContainer({ refresh }: { refresh: boolean }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = () => {
    fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(getTasks, [refresh]);

  return (
    <div className="bg-white text-black flex justify-center py-6">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <div className="w-full grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
