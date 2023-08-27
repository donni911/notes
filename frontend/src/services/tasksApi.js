import http from "./http.js";

const getTasks = async () => {
  const res = await http.get("/tasks");
  return res.data;
};

const addTask = async (task) => {
  const res = await http.post("/tasks", task);
  return res.data;
};

const deleteTask = async (id) => {
  const res = await http.delete(`/tasks/${id}`);
  return res.data;
};

const updateTask = async (id, updatedTask) => {
  const res = await http.patch(`/tasks/${id}`, updatedTask);
  return res.data;
};

export { getTasks, addTask, deleteTask, updateTask };
