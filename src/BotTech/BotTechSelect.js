import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import setGridType from './BotTechGridPatterns';

export default function SelectGrid(props) {
  const handleChange = (event, newValue) => {
    props.function(newValue)
  };
  return (
    <Select defaultValue="randomDots" onChange={handleChange}>
      <Option value="horizontalLines">Horizontal Lines</Option>
      <Option value="verticalLines">Vertical Lines</Option>
      <Option value="diagonalStripes">Diagonal Stripes</Option>
      <Option value="circularPattern">Circular Pattern</Option>
      <Option value="concentricCircles">Concentric Circles</Option>
      <Option value="randomDots">Random Dots</Option>
    </Select>
  );
}
