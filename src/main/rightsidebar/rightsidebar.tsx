// src/main/rightsidebar.tsx
import { useState } from "react";
import "./rightsidebar.css";
import "./rightsidebartext.css";
import HamburgerButton from "./hamburgerbutton";
import "./hamburgerbutton.css";

const RightSidebar = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div>
      <div className="content">
        <HamburgerButton
          onClick={() => setShowRightSidebar(!showRightSidebar)}
        />
      </div>

      <div
        className={
          showRightSidebar
            ? "rightsidebar rightsidebar-show"
            : "rightsidebar rightsidebar-hidden"
        }
      >
        <h2
          className={`textrightsidebartitle ${showRightSidebar ? "fade-in-right" : "fade-out-right"}`}
        >
          side
        </h2>
      </div>
      <div
        className={`overlay ${showRightSidebar ? "overlay-show" : ""}`}
        onClick={() => setShowRightSidebar(false)}
      />
      <div
        className={`overlay-slide ${showRightSidebar ? "show" : ""}`}
        onClick={() => setShowRightSidebar(false)}
      />
    </div>
  );
};

export default RightSidebar;
