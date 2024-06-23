import Box from '@mui/material/Box';
import React from 'react';

export const CustomTab = ({ value, index, children, boxWidth = "33%" }) => {
    return <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        style={{ height: "90%", width: "100%" }}
    >
        {value === index && <Box sx={{ p: 3, width: boxWidth }}>{children}</Box>}
    </div>
}