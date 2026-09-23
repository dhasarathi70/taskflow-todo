function StatsDashboard({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (task.completed || !task.dueDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      `${task.dueDate}T00:00:00`
    );
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }).length;

  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    return task.dueDate === localToday;
  }).length;

  const upcomingTasks = tasks.filter((task) => {
    if (task.completed || !task.dueDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      `${task.dueDate}T00:00:00`
    );
    dueDate.setHours(0, 0, 0, 0);

    return dueDate > today;
  }).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const priorityCounts = {
    high: tasks.filter(
      (task) => task.priority === "high"
    ).length,

    medium: tasks.filter(
      (task) => task.priority === "medium"
    ).length,

    low: tasks.filter(
      (task) => task.priority === "low"
    ).length,
  };

  const categoryCounts = {
    Study: tasks.filter(
      (task) => task.category === "Study"
    ).length,

    Work: tasks.filter(
      (task) => task.category === "Work"
    ).length,

    Personal: tasks.filter(
      (task) => task.category === "Personal"
    ).length,

    Projects: tasks.filter(
      (task) => task.category === "Projects"
    ).length,

    Other: tasks.filter(
      (task) => task.category === "Other"
    ).length,
  };

  const categoryLabels = {
    Study: "Academy",
    Work: "Work",
    Personal: "Personal",
    Projects: "Projects",
    Other: "Other",
  };

  return (
    <section className="stats-dashboard">
      {/* =========================================
          HEADER
      ========================================== */}
      <div className="stats-header">
        <div>
          <span className="section-eyebrow">
            JOURNEY PROGRESS
          </span>

          <h2>Chronicle Overview</h2>

          <p>
            A quiet view of your progress, priorities,
            and daily chapters.
          </p>
        </div>

        <div className="completion-summary">
          <strong>{completionPercentage}%</strong>
          <span>Complete</span>
        </div>
      </div>

      {/* =========================================
          MAIN STAT CARDS
      ========================================== */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">
            Total Chapters
          </span>

          <strong>{totalTasks}</strong>

          <small>All tasks in your chronicle</small>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Completed Chapters
          </span>

          <strong>{completedTasks}</strong>

          <small>
            Chapters you have completed
          </small>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Chapters in Progress
          </span>

          <strong>{activeTasks}</strong>

          <small>Active chapters</small>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Overdue Chapters
          </span>

          <strong>{overdueTasks}</strong>

          <small>Past their due date</small>
        </div>
      </div>

      {/* =========================================
          PROGRESS BAR
      ========================================== */}
      <div className="progress-card">
        <div className="progress-card-header">
          <div>
            <span className="stat-label">
              JOURNEY PROGRESS
            </span>

            <h3>Completion Journey</h3>
          </div>

          <strong>{completionPercentage}%</strong>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={completionPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Task completion progress"
        >
          <div
            className="progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>

      {/* =========================================
          TODAY / UPCOMING
      ========================================== */}
      <div className="stats-secondary-grid">
        <div className="secondary-stat-card">
          <span className="stat-label">
            TODAY
          </span>

          <strong>{todayTasks}</strong>

          <span>Chapters due today</span>
        </div>

        <div className="secondary-stat-card">
          <span className="stat-label">
            UPCOMING
          </span>

          <strong>{upcomingTasks}</strong>

          <span>Future chapters</span>
        </div>
      </div>

      {/* =========================================
          PRIORITY BREAKDOWN
      ========================================== */}
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="stat-label">
              IMPORTANCE
            </span>

            <h3>Chapter Importance</h3>
          </div>

          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>
                <i className="breakdown-dot high-dot" />
                High
              </span>

              <strong>
                {priorityCounts.high}
              </strong>
            </div>

            <div className="breakdown-item">
              <span>
                <i className="breakdown-dot medium-dot" />
                Medium
              </span>

              <strong>
                {priorityCounts.medium}
              </strong>
            </div>

            <div className="breakdown-item">
              <span>
                <i className="breakdown-dot low-dot" />
                Low
              </span>

              <strong>
                {priorityCounts.low}
              </strong>
            </div>
          </div>
        </div>

        {/* =======================================
            CATEGORY BREAKDOWN
        ======================================== */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="stat-label">
              PATH
            </span>

            <h3>Chapter Paths</h3>
          </div>

          <div className="breakdown-list">
            {Object.entries(categoryCounts).map(
              ([category, count]) => (
                <div
                  className="breakdown-item"
                  key={category}
                >
                  <span>
                    <i className="breakdown-dot" />

                    {categoryLabels[category]}
                  </span>

                  <strong>{count}</strong>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsDashboard;