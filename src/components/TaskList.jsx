import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onTogglePin,
}) {
if (tasks.length === 0) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        ✓
      </div>

      <h3>No tasks found</h3>

      <p>
        There are no tasks matching your current
        filters.
      </p>

      <span>
        Try adding a new task or changing your filters.
      </span>
    </div>
  );
}

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}

export default TaskList;