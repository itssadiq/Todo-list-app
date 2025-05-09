export const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

export const completedTasks =
  JSON.parse(localStorage.getItem("completedTasks")) || [];
