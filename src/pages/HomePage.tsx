import { useEffect, useState } from "react";
import { type SyntheticEvent } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
};

export default function HomePage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      console.log("Task as been created!");
      setRefresh(!refresh);
      return;
    }

    const error = await response.json();
    console.error(error);
  };

  useEffect(() => {
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
  }, [refresh]);

  return (
    <div>
      <header className="border border-black bg-white text-black flex justify-center p-3">
        <div className="w-full max-w-7xl flex justify-between items-center">
          <h1 className="text-3xl">Daily</h1>

          <nav className="flex gap-8">
            <button className="hover:underline cursor-pointer">LOG-IN</button>
            <button className="hover:underline cursor-pointer">SIGN-IN</button>
          </nav>
        </div>
      </header>

      <main>
        <div className="bg-black flex justify-center">
          <div className="flex flex-col w-full max-w-xl gap-3 py-10">
            <h1 className="text-2xl font-bold text-center">Daily</h1>

            <span className="text-center">
              Stay organized and focused on your tasks
            </span>

            <form
              onSubmit={createTask}
              className="flex flex-col gap-4 w-full px-4"
            >
              <label htmlFor="title" className="flex flex-col gap-1">
                Title *
                <input
                  onChange={event => setTitle(event.target.value)}
                  value={title}
                  className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
                  placeholder="Enter title"
                  type="text"
                  name="title"
                  id="title"
                />
              </label>

              <label htmlFor="description" className="flex flex-col gap-1">
                Description *
                <input
                  onChange={event => setDescription(event.target.value)}
                  value={description}
                  className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
                  placeholder="Enter description"
                  type="text"
                  name="description"
                  id="description"
                />
              </label>

              <div className="flex flex-col gap-3">
                <button
                  className="w-full cursor-pointer bg-black text-white font-bold rounded-sm p-3 transition-colors border-2 border-white"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white text-black flex justify-center py-6">
          <div className="w-full max-w-7xl flex justify-between items-center">
            <div className="w-full grid grid-cols-2 gap-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="px-4 py-4 rounded-lg border border-black flex flex-col"
                >
                  <h2 className="text-2xl font-bold">{task.title}</h2>
                  <span>Deadline: Today, 5:00 PM</span>
                  <p>Description: {task.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
