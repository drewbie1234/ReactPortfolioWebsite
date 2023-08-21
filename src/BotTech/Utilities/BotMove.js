export const moveBotUp = (botPosition, setBotPosition, changeCellStyle) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first - 1}-${second}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
};

export const moveBotDown = (botPosition, setBotPosition, changeCellStyle) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first + 1}-${second}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
};

export const moveBotLeft = (botPosition, setBotPosition, changeCellStyle) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first}-${second - 1}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
};

export const moveBotRight = (botPosition, setBotPosition, changeCellStyle) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first}-${second + 1}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
    };


export const randomMove = (position) => {
    const moveFunctions = [
        moveBotUp,
        moveBotDown,
        moveBotLeft,
        moveBotRight
    ];
    const randomIndex = Math.floor(Math.random() * moveFunctions.length);
    const selectedMoveFunction = moveFunctions[randomIndex];
    selectedMoveFunction(position);
  };