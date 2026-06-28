import { useEffect, useState } from "react";
import { type SyntheticEvent } from "react";
import { type Task } from "../types/Task";

export default function HomePage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const createTask = async () => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const error = await response.json();

      return console.error(error);
    }

    setRefresh(!refresh);
    setTitle("");
    setDescription("");
  };

  const validateTitleField = () => {
    if (!title) {
      setTitleError("Title is required");
      return false;
    }

    if (title.length < 3 || title.length > 50) {
      setTitleError("Title must be between 3 and 50 characters long");
      return false;
    }

    return true;
  };

  const validateDescriptionField = () => {
    if (!description) {
      setDescriptionError("Description is required");
      return false;
    }

    if (description.length < 3 || description.length > 50) {
      setDescriptionError(
        "Description must be between 3 and 50 characters long",
      );
      return false;
    }

    return true;
  };

  const validateFields = () => {
    let shouldSubmit = true;

    if (!validateTitleField()) {
      shouldSubmit = false;
    }

    if (!validateDescriptionField()) {
      shouldSubmit = false;
    }

    return shouldSubmit;
  };

  const handleCreateTaskFormSubmit = (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateFields()) return;

    createTask();
  };

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
              onSubmit={handleCreateTaskFormSubmit}
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
                <span className="block text-red-400 text-sm whitespace-pre-wrap min-h-5">
                  {titleError}
                </span>
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
                <span className="block text-red-400 text-sm whitespace-pre-wrap min-h-5">
                  {descriptionError}
                </span>
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
