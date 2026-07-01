import TasksContainer from "../components/TasksContainer";
import Header from "../components/Header";
import CreateTaskForm from "../components/CreateTaskForm";
import { useState } from "react";

export default function HomePage() {
  const [refresh, setRefresh] = useState<boolean>(true);

  const refreshUserTasks = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <Header />

      <main>
        <CreateTaskForm refreshUserTasks={refreshUserTasks} />

        <TasksContainer refresh={refresh} refreshUserTasks={refreshUserTasks} />
      </main>
    </div>
  );
}
