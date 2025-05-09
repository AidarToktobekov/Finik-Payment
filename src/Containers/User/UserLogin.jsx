import React, {useState} from 'react';
import {Alert, Avatar, Button, Container, TextField, Typography, Link} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {login} from '../../features/user/userThunk.js';
import {selectLoginError, selectLoginLoading, selectUser} from '../../features/user/userSlice.js';
import LockIcon from '@mui/icons-material/Lock';
import {deepPurple} from '@mui/material/colors';
import './userLogin.css';

const UserLogin = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoginLoading);
    const error = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const onChange = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            const userMutation = {
                username: state.username.trim(),
                password: state.password.trim(),
            };

            await dispatch(login(userMutation)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container
            className="sign-in"
            component="form"
            maxWidth="xs"
            onSubmit={submitFormHandler}
        >
            <Avatar
                sx={{
                    bgcolor: deepPurple[500],
                    m: '0 auto',
                }}
            >
                <LockIcon style={{ color: 'white' }} />
            </Avatar>
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    textAlign: 'center',
                    pb: '20px',
                }}
            >
                Вход в систему
            </Typography>
            {error?.error ? (
                <Alert variant={'filled'} severity={"error"} sx={{
                    my: 2,
                }}>
                    {error?.error}
                </Alert>
            ): null}
            <TextField
                id="username"
                name="username"
                label="Имя пользователя"
                variant="outlined"
                value={state?.username}
                onChange={onChange}
                autoComplete={"current-username"}
                sx={{
                    width: '100%',
                }}
            />
            <TextField
                id="password"
                type="password"
                name="password"
                label="Пароль"
                variant="outlined"
                autoComplete={"current-password"}
                value={state?.password}
                onChange={onChange}
                sx={{
                    width: '100%',
                    mt: '10px'
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                }}
                disabled={!state.username || !state.password}
                loading={loading}
            >
                Логин
            </Button>
            <Link href={"/sign-up"} underline="hover" sx={{
                fontSize: '18px',
                fontFamily: 'Roboto, sans-serif',
                display: 'block',
                margin: '15px 0 0',
                textAlign: "center"
            }}>
                Зарегистрироваться
            </Link>
        </Container>
    );
};

export default UserLogin;
