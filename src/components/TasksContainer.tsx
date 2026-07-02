import TaskCard from "./TaskCard";
import { type Task } from "../types/Task";
import { useEffect, useState } from "react";

export default function TasksContainer({
  refresh,
  refreshUserTasks,
}: {
  refresh: boolean;
  refreshUserTasks: () => void;
}) {
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

  if (!tasks.length) {
    return (
      <main className="text-lg h-full bg-white text-black flex justify-center py-12 flex-1">
        No tasks have been created so far... 😭
      </main>
    );
  }

  return (
    <main className="h-full bg-white text-black flex justify-center py-12 flex-1">
      <div className="w-full max-w-7xl ">
        <div className="w-full grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <TaskCard
              refreshUserTasks={refreshUserTasks}
              task={task}
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
