import TasksContainer from "../components/TasksContainer";
import Header from "../components/Header";
import CreateTaskForm from "../components/CreateTaskForm";
import Footer from "../components/Footer";
import { useState } from "react";

export default function HomePage() {
  const [refresh, setRefresh] = useState<boolean>(true);

  const refreshUserTasks = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <Header />

      <CreateTaskForm refreshUserTasks={refreshUserTasks} />

      <TasksContainer refresh={refresh} refreshUserTasks={refreshUserTasks} />

      <Footer />
    </div>
  );
}
