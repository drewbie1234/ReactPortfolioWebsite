import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectRow({ selectedPattern, onSelectionChange }) {
  const handleChange = (event, value) => {
    const newValue = value;
    onSelectionChange(newValue); // Call the callback with the selected value
    console.log(event)
  };

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: ' center', alignItems: 'center', padding: '5vmin'}}>
    <label>Select a maze type: </label>
    <Select value={selectedPattern} onChange={handleChange}>
      <Option value="horizontalLines">Horizontal Lines</Option>
      <Option value="verticalLines">Vertical Lines</Option>
      <Option value="diagonalStripes">Diagonal Stripes</Option>
      <Option value="circularPattern">Circular Pattern</Option>
      <Option value="concentricCircles">Concentric Circles</Option>
      <Option value="randomDots">Random Dots</Option>
    </Select>
    </div>
    </>
  );
}