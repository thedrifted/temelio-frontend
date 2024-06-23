import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import { TAB_FIELDS } from "./constants";

export const TabComponent = ({ children, value, setValue }) => {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {TAB_FIELDS.map((field, index) => (
                        <Tab key={index} label={field} />
                    ))}
                </Tabs>
            </Box>
            {React.Children.map(children, (child, index) => (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    style={{ padding: 3 }}
                >
                    {value === index && <Box sx={{ p: 3 }}>{child}</Box>}
                </div>
            ))}
        </Box>
    );
};
