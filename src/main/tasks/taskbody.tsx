// src/main/tasks/taskbody.tsx
import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  const parentRef = useRef<HTMLDivElement>(null);
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


  const allDates = React.useMemo(() => {
    const start = new Date(Math.min(...tasks.map((t) => new Date(t.start).getTime())));
    const end = new Date(Math.max(...tasks.map((t) => new Date(t.end).getTime())));
    const dates: string[] = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, [tasks]);


  const today = new Date().toISOString().slice(0, 10);

  const virtualizer = useVirtualizer({
    count: allDates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    horizontal: true,
  });

  if (tasks.length === 0) return null;

  return (
    <div className="chart-wrapper" ref={parentRef}>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-row" key={task.id}>
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
        ))}
      </div>
    </div>
  );
};

export default TaskBody;
