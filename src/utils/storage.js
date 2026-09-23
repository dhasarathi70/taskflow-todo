const STORAGE_KEY = "taskflow_tasks";

export const loadTasks = () => {
  try {
    const savedTasks =
      localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks.map((task) => ({
      ...task,

      description: task.description || "",

      priority: task.priority || "medium",

      category: task.category || "Other",

      dueDate: task.dueDate || "",

      dueTime: task.dueTime || "",

      reminder: task.reminder || false,

      reminderSent: task.reminderSent || false,

      isPinned: task.isPinned || false,

      completed: Boolean(task.completed),
    }));
  } catch (error) {
    console.error(
      "Failed to load TaskFlow data:",
      error
    );

    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error(
      "Failed to save TaskFlow data:",
      error
    );
  }
};