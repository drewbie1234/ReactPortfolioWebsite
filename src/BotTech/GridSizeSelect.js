import React, { useState} from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

function GridSizeSelect( {selectedSize, onSelectionChanged} ) {
  const handleChange = (event, value) => {
    console.log(event.target.value)
    onSelectionChanged(event.target.value)
  };

  return (
    <FormControl sx={{ p: 2, flexDirection: 'row', gap: 2, width: '10vmin', height: '10vmin'}}>
      <FormLabel>Grid Size</FormLabel>
      <RadioGroup 
        name="radio-buttons-group"
      >
        <Radio value="small" label="small" variant="outlined" size="sm" onChange={handleChange} />
        <Radio value="medium" label="medium" variant="outlined" size="sm" onChange={handleChange}/>
        <Radio value="large" label="large" variant="outlined" size="sm" onChange={handleChange}/>
      </RadioGroup>
    </FormControl>
  );
}

export default GridSizeSelect;