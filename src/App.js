import * as React from 'react';
import { useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';

import './styles/style.css';

const App = () => {
    const [page, setPage] = React.useState('authors');
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState(null);
    const client = useApolloClient();

    React.useEffect(() => {
        if (localStorage.getItem('loggedIn')) {
            setLoggedIn(localStorage.getItem('loggedIn'));
            setToken(localStorage.getItem('token'));
        }
    }, []);

    return (
        <div>
            <div className={'btn-row'}>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>

                {loggedIn ? (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                setLoggedIn(false);
                                setToken(null);
                                client.resetStore();
                            }}
                        >
                            logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
            <Login
                show={page === 'login'}
                setLoggedIn={setLoggedIn}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
