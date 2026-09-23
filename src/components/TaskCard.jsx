import { useState } from "react";

function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
  onTogglePin,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const formattedDate = new Date(
    task.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const getDueStatus = () => {
    if (!task.dueDate) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${task.dueDate}T00:00:00`);
    due.setHours(0, 0, 0, 0);

    const difference = Math.round(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (task.completed) {
      return {
        label: "Completed",
        className: "due-completed",
      };
    }

    if (difference < 0) {
      return {
        label: "Overdue",
        className: "due-overdue",
      };
    }

    if (difference === 0) {
      return {
        label: "Due today",
        className: "due-today",
      };
    }

    if (difference === 1) {
      return {
        label: "Due tomorrow",
        className: "due-tomorrow",
      };
    }

    return {
      label: `Due ${new Date(
        `${task.dueDate}T00:00:00`
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })}`,
      className: "due-upcoming",
    };
  };

  const dueStatus = getDueStatus();

  /*
    Keep the original category values internally.

    Example:
    task.category === "Study"

    is still stored as "Study", but the user sees
    "Academy" in the Celestial Chronicle UI.
  */
  const getCategoryLabel = () => {
    const categoryLabels = {
      Study: "Academy",
      Work: "Work",
      Personal: "Personal",
      Projects: "Projects",
      Other: "Other",
    };

    return categoryLabels[task.category] || task.category;
  };

  return (
    <article
      className={`task-card ${
        task.completed ? "completed" : ""
      } ${task.isPinned ? "pinned" : ""}`}
    >
      {/* =========================================
          TASK MAIN
      ========================================== */}
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          aria-label={`Mark ${task.title} as ${
            task.completed ? "active" : "completed"
          }`}
        />

        <div className="task-content">
          {/* =====================================
              TITLE
          ====================================== */}
          <div className="task-title-row">
            <h3 title={task.title}>
              {task.title}
            </h3>

            {task.isPinned && (
              <span
                className="pin-indicator"
                title="Pinned chapter"
                aria-label="Pinned chapter"
              >
                ✦
              </span>
            )}
          </div>

          {/* =====================================
              DESCRIPTION
          ====================================== */}
          {task.description && (
            <p className="task-description">
              {task.description}
            </p>
          )}

          {/* =====================================
              TASK META
          ====================================== */}
          <div className="task-meta">
            {/* Priority */}
            <span
              className={`priority-badge ${task.priority}`}
            >
              {task.priority}
            </span>

            {/* Reminder */}
            {task.reminder && (
              <span
                className="reminder-badge"
                title="Reminder enabled"
              >
                ✦ Reminder
              </span>
            )}

            {/* Category / Path */}
            {task.category && (
              <span
                className="category-badge"
                title={`Path: ${getCategoryLabel()}`}
              >
                {getCategoryLabel()}
              </span>
            )}

            {/* Due status */}
            {dueStatus && (
              <span
                className={`due-badge ${dueStatus.className}`}
              >
                {dueStatus.label}
              </span>
            )}

            {/* Created date */}
            <span className="task-date">
              Created {formattedDate}
            </span>
          </div>

          {/* =====================================
              DUE TIME
          ====================================== */}
          {task.dueTime && task.dueDate && (
            <div className="task-due-time">
              ◷ {task.dueTime}
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          ACTION MENU
      ========================================== */}
      <div className="task-actions">
        <button
          className="menu-button"
          onClick={() =>
            setShowMenu((previous) => !previous)
          }
          type="button"
          aria-label={`Actions for ${task.title}`}
          aria-expanded={showMenu}
          aria-haspopup="menu"
        >
          ⋮
        </button>

        {showMenu && (
          <div
            className="task-menu"
            role="menu"
          >
            {/* ===================================
                PIN / UNPIN
            ==================================== */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onTogglePin(task.id);
                setShowMenu(false);
              }}
            >
              {task.isPinned
                ? "✦ Unpin Chapter"
                : "✦ Pin Chapter"}
            </button>

            {/* ===================================
                EDIT
            ==================================== */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onEdit(task);
                setShowMenu(false);
              }}
            >
              ✧ Edit Chapter
            </button>

            {/* ===================================
                DELETE
            ==================================== */}
            <button
              type="button"
              role="menuitem"
              className="danger-action"
              onClick={() => {
                onDelete(task);
                setShowMenu(false);
              }}
            >
              × Delete Chapter
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default TaskCard;