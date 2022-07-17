import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {
    Box,
    TextField,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@mui/material'

/** include Thunks */
import {getTickets, sendTicket} from '../store/tickets'

export const TiketsPage = ({session, isAdmin}) => {
    const dispatch = useDispatch();
    const {tickets, status} = useSelector((state) => state.tickets);
    const {firstName, lastName} = useSelector((state) => state.profile.form);
    const [form, setForm] = useState('');
    const [importance, setImportance] = useState("high");
    const isForm = !(!!form);

    console.log("IMP", importance)

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
            ticketText: form
        };
        await dispatch(sendTicket(ticket, session.uid));
        dispatch(getTickets(session.uid, isAdmin))
        setForm('');
    };

    useEffect(() => {
        dispatch(getTickets(session.uid, isAdmin));
    }, []);

    return (
        <div>
            <h3>Здесть можно оставить заявку на решение проблемы</h3>
            <div style={{display: "flex"}}>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '45ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-multiline-static"
                            label="Опишите проблему"
                            multiline
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
                                    <MenuItem value="normal">В рабочем порядке</MenuItem>
                                    <MenuItem value="high">Срочно</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                style={{marginTop: "12px"}}
                                variant="outlined"
                                onClick={sandClickHandler}
                                disabled={isForm}
                            >
                                Отправить
                            </Button>
                        </div>
                    </Box>
                </div>
                <div>
                    <div>Задачи, отправленные мной:</div>
                    {
                        !status.pendingGet ?
                            tickets.map(el => (
                                <div style={{
                                    border: "solid 1px grey",
                                    borderRadius: "5px",
                                    marginBottom: "5px",
                                    padding: "5px",
                                    textAlign: "left"
                                }}>
                                    <div><span>Дата: </span><span>{el.ticketDate}</span></div>
                                    <div>
                                        <span>Отправитель: </span><span>{el.ticketAuthorLastName} {el.ticketAuthorFirstName}</span>
                                    </div>
                                    <div>
                                        <span>Статус: </span><span>{el.ticketStatus === 'sent' ? "Отправлено" : el.ticketStatus === 'processed' ? "Выполняется" : "Готово"}</span>
                                    </div>
                                    <div><span>Описание проблемы:</span></div>
                                    <div><span><span>{el.ticketText}</span></span></div>
                                </div>
                            ))
                            : <span>Loading...</span>
                    }
                </div>
            </div>
        </div>
    );
};