// src/main/tasks/tasktypes.ts
export type TaskType = {
  id: string;
  title: string;
  start: string; // ISO形式 "2025-06-18"
  end: string;
  color: string;
};

export type RenderedTask = TaskType & {
  marginLeft: number;
  width: number;
};
