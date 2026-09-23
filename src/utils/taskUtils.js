export const formatTaskDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  return new Date(
    `${dateString}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const isOverdue = (task) => {
  if (!task.dueDate || task.completed) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(
    `${task.dueDate}T00:00:00`
  );

  return dueDate < today;
};

export const getTaskStatus = (task) => {
  if (task.completed) {
    return "completed";
  }

  if (isOverdue(task)) {
    return "overdue";
  }

  if (!task.dueDate) {
    return "active";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(
    `${task.dueDate}T00:00:00`
  );

  if (dueDate.getTime() === today.getTime()) {
    return "today";
  }

  return "upcoming";
};