import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../query';

const Authors = props => {
    const { loading, error, data } = useQuery(ALL_AUTHORS);
    const [authorOption, setAuthorOption] = useState('');
    const [editAuthor] = useMutation(EDIT_AUTHOR);

    useEffect(() => {
        if (data) {
            setAuthorOption(data.allAuthors[0].name);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!props.show) {
        return null;
    }

    const handleAuthorOptionChange = e => {
        e.preventDefault();
        setAuthorOption(e.target.value);
    };

    const handleAuthorForm = e => {
        e.preventDefault();

        editAuthor({
            variables: {
                name: authorOption,
                setBornTo: Number(e.target.birthYear.value)
            }
        });
    };

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {data.allAuthors.map(a => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Set Birth Year</h2>
                {authorOption && (
                    <select
                        value={authorOption}
                        onChange={handleAuthorOptionChange}
                    >
                        {data.allAuthors.map(a => (
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                )}
                <form onSubmit={handleAuthorForm}>
                    <label htmlFor={'birth-year'}>Birth Year:</label>
                    <input
                        name={'birthYear'}
                        id={'birth-year'}
                        type={'number'}
                    />
                    <button>Update Author</button>
                </form>
            </div>
        </div>
    );
};

export default Authors;
