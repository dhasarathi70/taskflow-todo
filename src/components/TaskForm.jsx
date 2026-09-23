import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Study");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setError("Task title must be at least 3 characters.");
      return;
    }

    onAddTask({
      title: trimmedTitle,
      description: description.trim(),
      priority,
      category,
      dueDate,
      dueTime,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("Study");
    setDueDate("");
    setDueTime("");
    setError("");
  };

  return (
    <form
      className="advanced-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="task-title">
          Task title
        </label>

        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">
          Description
        </label>

        <textarea
          id="task-description"
          placeholder="Add some details about this task..."
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-priority">
            Priority
          </label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-category">
            Category
          </label>

          <select
            id="task-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Projects">Projects</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-due-date">
            Due date
          </label>

          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-due-time">
            Due time
          </label>

          <input
            id="task-due-time"
            type="time"
            value={dueTime}
            onChange={(event) =>
              setDueTime(event.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="add-task-button"
        >
          Add Task
        </button>
      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </form>
  );
}

export default TaskForm;