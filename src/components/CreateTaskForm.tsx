import { useState } from "react";
import { type SyntheticEvent } from "react";

export default function CreateTaskForm({
  refreshUserTasks,
}: {
  refreshUserTasks: () => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

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

    refreshUserTasks();
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

  return (
    <div className="bg-black flex justify-center">
      <div className="flex flex-col w-full max-w-xl gap-3 py-10">
        <h1 className="text-2xl font-bold text-center">Daily</h1>

        <span className="text-center">
          Stay organized and focused on your tasks
        </span>

        <form
          onSubmit={handleCreateTaskFormSubmit}
          className="flex flex-col gap-1 w-full px-4"
        >
          <label htmlFor="title" className="flex flex-col gap-1">
            Title *
            <input
              onChange={event => {
                setTitle(event.target.value);
                setTitleError("");
              }}
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
              onChange={event => {
                setDescription(event.target.value);
                setDescriptionError("");
              }}
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

          <div className="flex flex-col gap-3 mt-2">
            <button
              className="w-full cursor-pointer bg-black text-white font-bold rounded-sm p-3 transition-colors border-2 border-white"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
