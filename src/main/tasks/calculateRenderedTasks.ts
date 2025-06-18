// src/main/tasks/calculateRenderedTasks.ts
import { TaskType, RenderedTask } from "./tasktypes";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function calculateRenderedTasks(
  tasks: TaskType[],
  chartStart: Date
): RenderedTask[] {
  return tasks.map((task) => {
    const start = new Date(task.start);
    const end = new Date(task.end);

    const offsetDays = Math.floor((start.getTime() - chartStart.getTime()) / MS_PER_DAY);
    const durationDays = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;

    return {
      ...task,
      marginLeft: offsetDays * 40,
      width: durationDays * 40,
    };
  });
}
