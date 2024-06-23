import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const SendEmailComponent = ({ foundations = [], nonProfits = [], sendEmail = () => { } }) => {
    const [selectedFoundation, setSelectedFoundation] = useState('');
    const [selectedNonProfits, setSelectedNonProfits] = useState([]);

    const handleFoundationChange = (event) => {
        setSelectedFoundation(event.target.value);
    };

    const handleNonProfitToggle = (value) => {
        const currentIndex = selectedNonProfits.indexOf(value);
        const newChecked = [...selectedNonProfits];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedNonProfits(newChecked);
    };

    const handleSendClick = () => {
        sendEmail(
            foundations[selectedFoundation],
            selectedNonProfits.map(index => nonProfits[index])
        );
    };

    return (
        <Box sx={{ minWidth: 300, padding: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
                Send Email
            </Typography>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel id="foundation-select-label">Foundation</InputLabel>
                <Select
                    labelId="foundation-select-label"
                    id="foundation-select"
                    value={selectedFoundation}
                    label="Foundation"
                    onChange={handleFoundationChange}
                >
                    {foundations.map((foundation, index) => (
                        <MenuItem key={index} value={index}>
                            {foundation.email}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="subtitle1" gutterBottom>
                Select Non-Profits
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <List>
                {nonProfits.map((nonProfit, index) => (
                    <ListItem key={index} button onClick={() => handleNonProfitToggle(index)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedNonProfits.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={nonProfit.email} />
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendClick}
                sx={{ marginTop: 2 }}
                fullWidth
            >
                Send
            </Button>
        </Box>
    );
};
