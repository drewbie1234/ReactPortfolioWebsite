import React, { useState, useEffect } from "react";
import { randomMove } from "./BotMove";



function RandomBotMove() {

    const [botPosition, setBotPosition] = useState(`10-10`);

    useEffect(() => {
        const randomMoveInterval = setInterval(() => {
          randomMove(botPosition);
        }, 100); // Call a random move every 1000ms (1 second)
    
        return () => {
          clearInterval(randomMoveInterval);
        };
      }, [botPosition]);
}

export default RandomBotMove