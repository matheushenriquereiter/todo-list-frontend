import { type Task } from "../types/Task";

export default function TaskCard({
  task,
  refreshUserTasks,
}: {
  task: Task;
  refreshUserTasks: () => void;
}) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("pt-BR");

  const deleteTask = async (taskId: number) => {
    const url = `/api/tasks/${taskId}`;
    console.log(taskId);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();

      console.log(task.id);
      return console.log(error);
    }

    refreshUserTasks();
  };

  return (
    <div className="px-4 py-4 rounded-lg border border-black flex flex-col">
      <h2 className="text-2xl font-bold">{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Created at: {formattedDate}</p>

      <button
        onClick={() => deleteTask(task.id)}
        className="border border-black rounded-lg self-end py-1 px-8 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
