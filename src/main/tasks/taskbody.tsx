// src/main/tasks/taskstyle.css
import React, { useRef } from "react";
import { RenderedTask } from "./tasktypes";
import "./taskstyle.css";

const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.currentTarget; // .ta 要素

  const ripple = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - target.getBoundingClientRect().left - radius}px`;
  ripple.style.top = `${event.clientY - target.getBoundingClientRect().top - radius}px`;
  ripple.className = "ripple";

  // 複数Rippleが重ならないように、個別に削除する
  target.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
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

  const start = new Date(
    Math.min(...tasks.map((t) => new Date(t.start).getTime())),
  );
  const end = new Date(
    Math.max(...tasks.map((t) => new Date(t.end).getTime())),
  );
  const today = new Date().toISOString().slice(0, 10);

  const dateRange: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    dateRange.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="chart-wrapper">
      <div className="chart-dates">
        {dateRange.map((date) => (
          <div
            key={date}
            className={`date-cell ${date === today ? "today" : ""}`}
          >
            {date.slice(5)}
          </div>
        ))}
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="ta"
            style={{
              marginLeft: `${task.marginLeft}px`,
              width: `${task.width}px`,
            }}
          >
            <div
              className="task-bar"
              onClick={createRipple}
              onMouseDown={() => handleMouseDown(task.id)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ backgroundColor: task.color }}
            >
              {task.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBody;
