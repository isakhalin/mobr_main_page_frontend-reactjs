import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTickets, sendTicket} from "../../../store/tickets";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

export const AdminTicketForm = ({session, isAdmin}) => {
    const dispatch = useDispatch();
    const {firstName, lastName} = useSelector((state) => state.profile.form);
    const [form, setForm] = useState('');
    const [importance, setImportance] = useState("low");
    const isForm = !(!!form);

    const setFormFromTextField = (event) => {
        setForm(event.target.value)
    };

    const sandClickHandler = async () => {
        const ticket = {
            ticketAuthorFirstName: firstName,
            ticketAuthorLastName: lastName,
            ticketDate: new Date().getTime(),
            ticketImportance: importance,
            ticketStatus: "sent",
            ticketExecutor: "Не назначен",
            userCompleted: false,
            ticketText: form
        };
        await dispatch(sendTicket(ticket, session.uid));
        dispatch(getTickets(session.uid, isAdmin))
        setForm('');
    };
    return (
        // <div>
        //     <h3>Здесть можно оставить заявку на решение проблемы</h3>
        //     <div style={{display: "flex", flexWrap: "wrap"}}>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-multiline-static"
                            label="Опишите проблему"
                            multiline
                            style={{width: "99%"}}
                            rows={4}
                            defaultValue=""
                            value={form}
                            // variant="filled"
                            onChange={setFormFromTextField}
                        />
                        <div>
                            <FormControl sx={{m: 1, minWidth: 200}} size="small">
                                <InputLabel id="demo-select-small">Срочность</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={importance}
                                    label="Срочность"
                                    onChange={(e) => setImportance(e.target.value)}
                                >
                                    <MenuItem value="low">Не срочно</MenuItem>
                                    <MenuItem value="normal">В порядке очереди</MenuItem>
                                    <MenuItem value="high">Срочно</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                style={{marginTop: "12px", padding: "4px 10px", lineHeight: "2"}}
                                variant="outlined"
                                onClick={sandClickHandler}
                                disabled={isForm}
                            >
                                Отправить
                            </Button>
                        </div>
                    </Box>
                </div>
        //     {/*</div>*/}
        // {/*</div>*/}
    );
};
