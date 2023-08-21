import axios from "axios";

const urlTasks = "http://localhost:4000/tasks";

const getTasks = async () => {
  const res = await axios.get(urlTasks);
  return res.data;
};

const addTask = async (task) => {
  const updatedTask = {
    ...task,
    starred: false,
    time: new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  };

  const res = await axios.post(urlTasks, updatedTask);

  return res.data;
};

const deleteTask = async (id) => {
  const res = await axios.delete(urlTasks, id);
  return res.data;
};

const updateTask = async (id, updatedTask) => {
  const res = await axios.patch(urlTasks + `/${id}`, updatedTask);
  return res.data;
};

export { getTasks, addTask, deleteTask, updateTask };
