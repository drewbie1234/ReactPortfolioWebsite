import { changeCellStyle } from "./ChangeCellStyle";
import React, { useState } from "react";

function PlayerMove(){

    const [position, setPosition] = useState(`0-0`);

    const movePlayerUp = () => {
        const [first, second] = position.split("-").map(Number);
        const newPosition = `${first - 1}-${second}`;
        setPosition(newPosition);
        changeCellStyle(newPosition, "green");
        changeCellStyle(position, "grey");
    };
    
    const movePlayerDown = () => {
        const [first, second] = position.split("-").map(Number);
        const newPosition = `${first + 1}-${second}`;
        setPosition(newPosition);
        changeCellStyle(newPosition, "green");
        changeCellStyle(position, "grey");
    };
    
    const movePlayerLeft = () => {
        const [first, second] = position.split("-").map(Number);
        const newPosition = `${first}-${second - 1}`;
        setPosition(newPosition);
        changeCellStyle(newPosition, "green");
        changeCellStyle(position, "grey");
    };
    
    const movePlayerRight = () => {
        const [first, second] = position.split("-").map(Number);
        const newPosition = `${first}-${second + 1}`;
        setPosition(newPosition);
        changeCellStyle(newPosition, "green");
        changeCellStyle(position, "grey");
    };

}

export default PlayerMove

