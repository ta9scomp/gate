// src/main/calendar/CalendarGantt.tsx
import React, { useRef, useEffect, useState } from "react";
import "./calendarbody.css";

const startYear = 2020;
const endYear = 2040;

// 2020年から2040年までの日付配列を生成（YYYY-MM-DD）
const generateDates = (start: number, end: number): string[] => {
  const dates = [];
  const current = new Date(start, 0, 1);
  const endDate = new Date(end, 11, 31);

  while (current <= endDate) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export default function CalendarBody() {
  const dates = React.useMemo(() => generateDates(startYear, endYear), []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(window.innerWidth);

  // ホイールで横スクロール操作
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!scrollContainerRef.current) return;

    // deltaYの値をそのままscrollLeftに加算して横スクロールにする
    scrollContainerRef.current.scrollLeft += e.deltaY;
  };

  // リサイズ対応（横幅更新）
  useEffect(() => {
    const onResize = () => setScrollWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 今日の日付を初期スクロール位置にセット
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const today = new Date().toISOString().slice(0, 10);
    const todayIndex = dates.findIndex((d) => d === today);

    if (todayIndex !== -1) {
      const cellWidth = 80;
      scrollContainerRef.current.scrollLeft = cellWidth * todayIndex;
    }
  }, [dates]);

  return (
    <div
      className="calendar-wrapper"
      ref={scrollContainerRef}
      onWheel={handleWheel}
      style={{ whiteSpace: "nowrap" }} // 横並び強制
    >
      {dates.map((date) => {
        const isToday = date === new Date().toISOString().slice(0, 10);
        return (
          <div
            key={date}
            className={`date-cell ${isToday ? "today" : ""}`}
            style={{ display: "inline-block", width: 80 }}
          >
            {date.slice(5)}
          </div>
        );
      })}
    </div>
  );
}
