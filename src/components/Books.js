import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../query';

const Books = props => {
    const { loading, error, data } = useQuery(ALL_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {data.allBooks.map(a => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
