import React, {createContext} from 'react';

export default createContext({
    Clients: [{}],
    addBook: () => {},
    deleteBook: () => {},
    addCheckedBookList: () => {},
    bookList: [{}],
})
