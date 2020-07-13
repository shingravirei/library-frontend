import * as React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../query';

const Login = ({ show, setLoggedIn, setToken, setPage }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [login, { data }] = useMutation(LOGIN);

    const submitForm = event => {
        event.preventDefault();
        login({
            variables: {
                username,
                password
            }
        });

        setUsername('');
        setPassword('');
    };

    React.useEffect(() => {
        if (data) {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);

            setToken(data.login.value);
            localStorage.setItem('token', data.login.value);

            setPage('books');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (!show) {
        return null;
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitForm}>
                {' '}
                <div>
                    username:{' '}
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        type={'text'}
                    />
                </div>
                <div>
                    password:{' '}
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type={'password'}
                    />
                </div>
                <button type={'submit'}>login</button>
            </form>
        </div>
    );
};

export default Login;
