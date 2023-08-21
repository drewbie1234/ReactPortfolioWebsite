import { changeCellStyle } from "./ChangeCellStyle";
import React, { useEffect, useState } from "react";

function MouseEvents(){

    const [mousePressed, setMousePressed] = useState(false);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setMousePressed(false);
        };
        document.addEventListener("mouseup", handleGlobalMouseUp);

        return () => {
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, []);
    
    const handleMouseDown = (key) => {
        changeCellStyle(key, "blue");
        setMousePressed(true);
    };

    const handleMouseOver = (key) => {
        if (mousePressed) {
            changeCellStyle(key, "blue");
        }
    };
}

export default MouseEvents



