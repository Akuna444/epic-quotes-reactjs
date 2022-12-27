import React, { useEffect, useState } from "react";
import useFetch from "./hooks/use-fetch";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useFetch();

  useEffect(() => {
    const transformTasks = (data) => {
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({
          id: taskKey,
          text: data[taskKey].text,
        });
      }
      console.log(loadedTasks);
      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://react-http-d7e0a-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
