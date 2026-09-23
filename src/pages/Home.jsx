import { useEffect, useMemo, useState } from "react";
import StatsDashboard from "../components/StatsDashboard";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import {
  requestNotificationPermission,
  sendNotification,
} from "../utils/notifications";
import {
  exportTasks,
  importTasks,
} from "../utils/backup";
import { loadTasks, saveTasks } from "../utils/storage";

function Home() {
  const [tasks, setTasks] = useState(loadTasks);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [undoData, setUndoData] = useState(null);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // ================================
  // ADD TASK
  // ================================
  const addTask = ({
    title,
    description,
    priority,
    category,
    dueDate,
    dueTime,
    reminder,
    reminderSent,
  }) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      priority,
      category,
      dueDate: dueDate || "",
      dueTime: dueTime || "",
      reminder: reminder || false,
      reminderSent: reminderSent || false,
      isPinned: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);
  };

  // ================================
  // COMPLETE / UNCOMPLETE TASK
  // ================================
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // ================================
  // PIN / UNPIN TASK
  // ================================
  const togglePin = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isPinned: !task.isPinned,
            }
          : task
      )
    );
  };

  // ================================
  // START DELETE
  // ================================
  const startDelete = (task) => {
    setTaskToDelete(task);
  };

  // ================================
  // CONFIRM DELETE
  // ================================
  const confirmDelete = () => {
    if (!taskToDelete) return;

    const deletedTask = taskToDelete;

    const originalIndex = tasks.findIndex(
      (task) => task.id === deletedTask.id
    );

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== deletedTask.id
      )
    );

    setUndoData({
      task: deletedTask,
      index: originalIndex,
    });

    setTaskToDelete(null);

    // Remove undo option after 5 seconds
    setTimeout(() => {
      setUndoData((currentUndo) => {
        if (
          currentUndo?.task.id === deletedTask.id
        ) {
          return null;
        }

        return currentUndo;
      });
    }, 5000);
  };

  // ================================
  // UNDO DELETE
  // ================================
  const undoDelete = () => {
    if (!undoData) return;

    setTasks((previousTasks) => {
      const restoredTasks = [...previousTasks];

      restoredTasks.splice(
        undoData.index,
        0,
        undoData.task
      );

      return restoredTasks;
    });

    setUndoData(null);
  };

  // ================================
  // UPDATE TASK
  // ================================
  const updateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );

    setEditingTask(null);
  };

  // ================================
  // CLEAR COMPLETED TASKS
  // ================================
  const clearCompleted = () => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => !task.completed
      )
    );
  };

  // ================================
  // STATISTICS
  // ================================
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // ================================
  // FILTER + SEARCH + SORT
  // ================================
  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter === "active") {
      result = result.filter(
        (task) => !task.completed
      );
    }

    if (filter === "completed") {
      result = result.filter(
        (task) => task.completed
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (task) => task.category === categoryFilter
      );
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery
        .toLowerCase()
        .trim();

      result = result.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(query) ||
          task.description
            ?.toLowerCase()
            .includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      // Pinned tasks always come first
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }

      if (sortBy === "newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "status") {
        return (
          Number(a.completed) -
          Number(b.completed)
        );
      }

      return 0;
    });

    return result;
  }, [
    tasks,
    searchQuery,
    filter,
    categoryFilter,
    sortBy,
  ]);

  useEffect(() => {
    const checkReminders = () => {
      if (
        !("Notification" in window) ||
        Notification.permission !== "granted"
      ) {
        return;
      }

      const now = new Date();

      setTasks((currentTasks) => {
        let changed = false;

        const updatedTasks = currentTasks.map((task) => {
          if (
            task.completed ||
            !task.reminder ||
            task.reminderSent ||
            !task.dueDate ||
            !task.dueTime
          ) {
            return task;
          }

          const reminderTime = new Date(
            `${task.dueDate}T${task.dueTime}`
          );

          if (now >= reminderTime) {
            changed = true;

            sendNotification(
              `TaskFlow Reminder: ${task.title}`,
              {
                body:
                  task.description ||
                  "Your task is due now.",
              }
            );

            return {
              ...task,
              reminderSent: true,
            };
          }

          return task;
        });

        return changed ? updatedTasks : currentTasks;
      });
    };

    checkReminders();

    const interval = setInterval(
      checkReminders,
      30 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  // ================================
  // UI
  // ================================
  return (
    <div className="app">
      {/* HEADER */}
      <Header
        totalTasks={totalTasks}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
      />

      <div className="notification-banner">
        <div>
          <strong>🔔 Task reminders</strong>
          <p>
            Allow browser notifications to receive reminders
            for your scheduled tasks.
          </p>
        </div>

        <button
          type="button"
          onClick={async () => {
            const permission =
              await requestNotificationPermission();

            if (permission === "granted") {
              alert(
                "Notifications enabled successfully!"
              );
            } else if (permission === "denied") {
              alert(
                "Notifications are blocked. Enable them from your browser settings."
              );
            }
          }}
        >
          Enable Notifications
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <StatsDashboard tasks={tasks} />

        {/* BACKUP CONTROLS */}
        <section className="backup-section">
          <div>
            <strong>Chronicle Archive</strong>

<p>
  Preserve your chapters or restore a previous chronicle.
</p>
          </div>

          <div className="backup-actions">
            <button
  type="button"
  className="secondary-button"
  onClick={() => exportTasks(tasks)}
>
  ↓ Save Chronicle
</button>

           <label className="secondary-button import-button">
  ↑ Restore Chronicle

  <input
    type="file"
    accept=".json,application/json"
    hidden
    onChange={async (event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      try {
        const importedTasks = await importTasks(file);

        const confirmed = window.confirm(
          `Restore ${importedTasks.length} chapters? This will replace your current chronicle.`
        );

        if (!confirmed) return;

        setTasks(importedTasks);
      } catch (error) {
        alert("Invalid TaskFlow chronicle file.");
      }

      event.target.value = "";
    }}
  />
</label>
          </div>
        </section>

        <section>
          <TaskForm onAddTask={addTask} />
        </section>

        {/* PROGRESS */}
        <section className="progress-section">
          <div className="progress-header">
            <span>Overall progress</span>

            <strong>
              {completionPercentage}%
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-bar"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>
        </section>

        {/* SEARCH + FILTER + SORT */}
        <section className="task-controls">
          {/* SEARCH */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="filters">
            <button
              type="button"
              className={
                filter === "all"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              type="button"
              className={
                filter === "active"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setFilter("active")}
            >
              Active
            </button>

            <button
              type="button"
              className={
                filter === "completed"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setFilter("completed")
              }
            >
              Completed
            </button>

            <select
              className="category-filter"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              <option value="all">All Categories</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Projects">Projects</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* SORT + CLEAR */}
          <div className="sort-section">
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              <option value="newest">
                Newest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="name">
                Name
              </option>

              <option value="status">
                Status
              </option>
            </select>

            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </div>
        </section>

        {/* TASK LIST */}
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={startDelete}
          onEdit={setEditingTask}
          onTogglePin={togglePin}
        />
      </main>

      {/* ================================
          EDIT TASK MODAL
      ================================= */}

      {editingTask && (
        <Modal
          title="Edit Task"
          onClose={() =>
            setEditingTask(null)
          }
        >
          <form
            className="edit-form"
            onSubmit={(event) => {
              event.preventDefault();

              updateTask(editingTask);
            }}
          >
            {/* TITLE */}
            <div className="form-group">
              <label>
                Task title
              </label>

              <input
                type="text"
                value={editingTask.title}
                onChange={(event) =>
                  setEditingTask({
                    ...editingTask,
                    title: event.target.value,
                  })
                }
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label>
                Description
              </label>

              <textarea
                value={
                  editingTask.description || ""
                }
                onChange={(event) =>
                  setEditingTask({
                    ...editingTask,
                    description:
                      event.target.value,
                  })
                }
                rows="4"
              />
            </div>

            {/* PRIORITY */}
            <div className="form-group">
              <label>
                Priority
              </label>

              <select
                value={editingTask.priority}
                onChange={(event) =>
                  setEditingTask({
                    ...editingTask,
                    priority:
                      event.target.value,
                  })
                }
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                value={editingTask.category || "Study"}
                onChange={(event) =>
                  setEditingTask({
                    ...editingTask,
                    category: event.target.value,
                  })
                }
              >
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Projects">Projects</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Due date</label>

                <input
                  type="date"
                  value={editingTask.dueDate || ""}
                  onChange={(event) =>
                    setEditingTask({
                      ...editingTask,
                      dueDate: event.target.value,
                      reminderSent: false,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Due time</label>

                <input
                  type="time"
                  value={editingTask.dueTime || ""}
                  onChange={(event) =>
                    setEditingTask({
                      ...editingTask,
                      dueTime: event.target.value,
                      reminderSent: false,
                    })
                  }
                />
              </div>
            </div>

            <div className="reminder-option">
              <label className="reminder-label">
                <input
                  type="checkbox"
                  checked={editingTask.reminder || false}
                  onChange={(event) =>
                    setEditingTask({
                      ...editingTask,
                      reminder: event.target.checked,
                      reminderSent: false,
                    })
                  }
                />

                <span>🔔 Enable reminder</span>
              </label>
            </div>

            {/* MODAL BUTTONS */}
            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setEditingTask(null)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ================================
          DELETE CONFIRMATION MODAL
      ================================= */}

      {taskToDelete && (
        <Modal
          title="Delete Task?"
          onClose={() =>
            setTaskToDelete(null)
          }
        >
          <div className="delete-confirmation">
            <p>
              Are you sure you want to delete
              <strong>
                {" "}
                "{taskToDelete.title}"
              </strong>
              ?
            </p>

            <p className="delete-warning">
              You can undo this action for a few
              seconds after deleting.
            </p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setTaskToDelete(null)
              }
            >
              Cancel
            </button>

            <button
              type="button"
              className="delete-confirm-button"
              onClick={confirmDelete}
            >
              Delete Task
            </button>
          </div>
        </Modal>
      )}

      {/* ================================
          UNDO BAR
      ================================= */}

      {undoData && (
        <div className="undo-bar">
          <span>
            Task deleted successfully.
          </span>

          <button
            type="button"
            onClick={undoDelete}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;