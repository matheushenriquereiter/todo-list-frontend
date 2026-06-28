import TasksContainer from "../components/TasksContainer";
import Header from "../components/Header";
import CreateTaskForm from "../components/CreateTaskForm";
import { useState } from "react";

export default function HomePage() {
  const [refresh, setRefresh] = useState<boolean>(true);

  return (
    <div>
      <Header />

      <main>
        <CreateTaskForm refresh={refresh} setRefresh={setRefresh} />

        <TasksContainer refresh={refresh} />
      </main>
    </div>
  );
}
