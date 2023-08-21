import React, { useEffect } from "react";
import { movePlayerUp, movePlayerDown, movePlayerLeft, movePlayerRight } from "./PlayerMove";

function KeyboardEvents() {

    useEffect(() => {
        const handleKeyDown = (event) => {
          switch (event.key) {
            case "ArrowUp":
              movePlayerUp();
              break;
            case "ArrowDown":
              movePlayerDown();
              break;
            case "ArrowLeft":
              movePlayerLeft();
              break;
            case "ArrowRight":
              movePlayerRight();
              break;
            default:
              // Handle other key presses if needed
              break;
          }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
    }, );
}

export default KeyboardEvents