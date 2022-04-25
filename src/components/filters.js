import React from 'react';
import { 
    Slider,
    TextField
} from '@mui/material';

import {
    PeopleAltOutlined,
    RoomOutlined
} from '@mui/icons-material';

const marks = [
    {
      value: 0.1,
      label: '1',
    },
    {
      value: 0.2,
    },
    {
      value: 0.5,
    },
    {
      value: 1,
    },
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 2,
    },
    {
      value: 5,
    },
    {
      value: 10,
      label: '100',
    },
    {
      value: 15,
    },
    {
      value: 20,
      label: '200',
    },
    {
      value: 25,
    },
    {
      value: 50,
      label: '500',
    },
    {
      value: 100,
      label: '1000',
    },
  ];
  
  function valuetext(value) {
    return value;
  }
  
  function valueLabelFormat(value) {
    return value * 10; //marks.findIndex((mark) => mark.value === value) + 1;
  }
  
   
export default function Filters() {
    
    return (
        <div className="filters">
            <h3 className="serif">Select your event location and size</h3>
            <p>Where will the event or activity take place and how many people will be attending?</p>

            <h4><RoomOutlined fontSize="small" style={{ color: '#318AD0', marginBottom: -3 }} /> LOCATION</h4>
            <TextField 
                fullWidth
                id="outlined-basic" 
                label="Search by country or region" 
                variant="outlined" 
            />

            <h4 style={{marginBottom: 40}}><PeopleAltOutlined fontSize="small" style={{ color: '#318AD0', marginBottom: -3 }} /> CROWD SIZE</h4>
            <Slider
                aria-label="Restricted values"
                defaultValue={10}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="on"
                marks={marks}
                markLabel={false}
            />
        </div>
    );
}
