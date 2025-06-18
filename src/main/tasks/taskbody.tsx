// src/main/tasks/taskbody.tsx
import React, { useRef } from "react";
import { FixedSizeList as List } from "react-window";
import { RenderedTask } from "./tasktypes";
import "./taskstyle.css";

const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.currentTarget;
  const ripple = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - target.getBoundingClientRect().left - radius}px`;
  ripple.style.top = `${event.clientY - target.getBoundingClientRect().top - radius}px`;
  ripple.className = "ripple";

  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
};

const TaskBody: React.FC<{ tasks: RenderedTask[] }> = ({ tasks }) => {
  const longPressTimer = useRef<number | null>(null);

  const handleMouseDown = (taskId: string) => {
    longPressTimer.current = window.setTimeout(() => {
      console.log("長押し:", taskId);
    }, 600);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  if (tasks.length === 0) return null;

  return (
    <div className="chart-wrapper" style={{ height: "600px", width: "100%" }}>
      <List
        height={600} // 表示領域の高さ
        itemCount={tasks.length}
        itemSize={40} // 各タスク行の高さ（必要に応じて調整）
        width="100%"
      >
        {({ index, style }) => {
          const task = tasks[index];
          return (
            <div className="task-row" key={task.id} style={style}>
              <div className="task-label">{task.title}</div>
              <div
                className="task-bar"
                onClick={createRipple}
                onMouseDown={() => handleMouseDown(task.id)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  backgroundColor: task.color,
                  marginLeft: `${task.marginLeft}px`,
                  width: `${task.width}px`,
                }}
              />
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default TaskBody;
