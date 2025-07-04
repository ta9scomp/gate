//app.tsx

import React, { useState, useEffect } from "react";
import "./main/customfont.css";
import Header from "./main/header/headerbody";
import RightSidebar from "./main/rightsidebar/rightsidebar";
import Selecteicons from "./main/selecteicons";
import { TaskType } from "./main/tasks/tasktypes";
import { calculateRenderedTasks } from "./main/tasks/calculateRenderedTasks";
import TaskBody from "./main/tasks/taskbody";
import { sampleTasks } from "./main/tasks/sampletask";
import RippleTest from "./main/tasks/rippletest";
import CalendarBody from "./main/calendar/calendarbody";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showRightSidebar, setShowRightSidebar] = useState(false); // ← ハンバーガー制御用

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved && JSON.parse(saved).length > 0) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks(sampleTasks);
      localStorage.setItem("tasks", JSON.stringify(sampleTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const renderedTasks = calculateRenderedTasks(tasks, new Date("2025-06-01"));

  return (
    <div>
      {/* ヘッダーを最上部に表示 */}
      <Header onHamburgerClick={() => setShowRightSidebar((prev) => !prev)} />

      {/* 右サイドバー　設定パネル */}
      <RightSidebar
        show={showRightSidebar}
        onClose={() => setShowRightSidebar(false)}
      />
      {/* カレンダー本体 */}
      <CalendarBody/>

      {/* 開発用検証スペース */}
      <TaskBody tasks={renderedTasks} />
      <Selecteicons />
      <RippleTest />
    </div>
  );
}

export default App;
