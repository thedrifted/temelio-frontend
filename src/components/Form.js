import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Form = ({ onClick, formFields = [{ label: "email" }] }) => {
    const [formState, setFormState] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        onClick(formState);
    };

    return (
        <Box sx={{ maxWidth: '400px', margin: 'auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Stack spacing={2}>
                {formFields.map((formField) => (
                    <TextField
                        key={formField.name}
                        name={formField.name}
                        value={formState[formField.name]}
                        id="outlined-basic"
                        label={formField.label}
                        variant="outlined"
                        onChange={handleInputChange}
                        fullWidth
                    />
                ))}
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </Stack>
        </Box>
    );
};
