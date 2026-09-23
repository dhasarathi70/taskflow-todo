export const exportTasks = (tasks) => {
  const data = JSON.stringify(tasks, null, 2);

  const blob = new Blob(
    [data],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `taskflow-backup-${new Date()
    .toISOString()
    .split("T")[0]}.json`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importTasks = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const tasks = JSON.parse(
          event.target.result
        );

        if (!Array.isArray(tasks)) {
          throw new Error(
            "Invalid TaskFlow backup file."
          );
        }

        resolve(tasks);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(
        new Error("Unable to read backup file.")
      );
    };

    reader.readAsText(file);
  });
};