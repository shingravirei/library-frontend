import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
    query {
        allBooks {
            id
            title
            author
            published
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`;

export const ADD_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            id
            title
            author
            published
            genres
        }
    }
`;
