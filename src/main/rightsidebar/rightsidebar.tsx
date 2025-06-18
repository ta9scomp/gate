// src/main/rightsidebar.tsx
import { Sidebar } from "lucide-react";
import { useState } from "react";
import "./rightsidebar.css";
import "./rightsidebartext.css";

type RightSidebarProps = {
  show: boolean;
  onClose: () => void;
};

const RightSidebar: React.FC<RightSidebarProps> = ({ show, onClose }) => {
  return (
    <>
      <div
        className={
          show
            ? "rightsidebar rightsidebar-show"
            : "rightsidebar rightsidebar-hidden"
        }
      >
        <h2
          className={`textrightsidebartitle ${show ? "fade-in-right" : "fade-out-right"}`}
        >
          side
        </h2>
      </div>
      <div
        className={`overlay ${show ? "overlay-show" : ""}`}
        onClick={onClose}
      />
      <div
        className={`overlay-slide ${show ? "show" : ""}`}
        onClick={onClose}
      />
    </>
  );
};

export default RightSidebar;