// src/main/calender/calendarbody.tsx
import React, { useRef, useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./calendarbody.css";

function generateDateRange(startYear: number, endYear: number): string[] {
  const dates: string[] = [];
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const yyyy = d.getFullYear();
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    const dd = d.getDate().toString().padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
  }
  return dates;
}

type CalendarBodyProps = {
  startYear?: number;
  endYear?: number;
  today?: string;
};

export default function CalendarBody({
  startYear = 2020,
  endYear = 2040,
  today = new Date().toISOString().slice(0, 10),
}: CalendarBodyProps) {
  const parentRef = useRef<HTMLDivElement>(null);


    // マウスホイールで横スクロールを実装
  const [scale, setScale] = useState(1); // デフォルトは100%

useEffect(() => {
  const el = parentRef.current;
  if (!el) return;

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault(); // Ctrl + ホイール → ズーム
      const zoomFactor = 1.05;
      setScale((prev) => {
        const next = e.deltaY < 0 ? prev * zoomFactor : prev / zoomFactor;
        return Math.min(Math.max(next, 0.5), 4); // 0.5x〜4x に制限
      });
    } else {
      e.preventDefault();
      const speed = e.shiftKey ? 5 : 1;
      el.scrollLeft += e.deltaY * speed; // 横スクロール（速度調整）
    }
  };

  el.addEventListener("wheel", handleWheel, { passive: false });
  return () => el.removeEventListener("wheel", handleWheel);
}, []);
  
  const allDates = React.useMemo(() => generateDateRange(startYear, endYear), [startYear, endYear]);

  const rowVirtualizer = useVirtualizer({
    count: allDates.length,
    getScrollElement: () => parentRef.current,
    horizontal: true,
    estimateSize: () => 80,
  });

  useEffect(() => {
  console.log("Current scale:", scale);
}, [scale]);


  // 今日の日付の位置にスクロールを合わせる処理
  useEffect(() => {
    if (!parentRef.current) return;

    const index = allDates.indexOf(today);
    if (index === -1) return;

    const virtualItems = rowVirtualizer.getVirtualItems();
    // 今日の日付の仮想アイテムを取得
    const todayItem = virtualItems.find((v) => v.index === index);

    // 今日の日付の開始位置(px)
    const todayStart = todayItem ? todayItem.start : index * 80;

    // スクロール位置を今日の日付位置の300px左に調整。ただし0未満にはしない
    const scrollLeft = Math.max(todayStart - 300, 0);

    parentRef.current.scrollLeft = scrollLeft;
  }, [allDates, today, rowVirtualizer]);

  return (
    <div ref={parentRef} className="calendar-wrapper">
        
  <div
  className="calendar-inner"
  style={{
    width: `${rowVirtualizer.getTotalSize() * scale}px`,
    height: "50px",
    position: "relative",
    transformOrigin: "left",
    transition: "transform 0.1s ease-out",
  }}
>


        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const date = allDates[virtualRow.index];
          const isToday = date === today;

          return (
            <div
              key={date}
              className={`date-cell ${isToday ? "today" : ""}`}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "50px",
                width: `${virtualRow.size * scale}px`, // ← scale 反映！
                transform: `translateX(${virtualRow.start * scale}px)`, // ← ここも重要
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid #ccc",
                boxSizing: "border-box",
                userSelect: "none",
                fontWeight: isToday ? "bold" : "normal",
                backgroundColor: isToday ? "#ffefc7" : "white",
              }}
            >
              {date.slice(5)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
