export const ADD_CLIENT = "ADD_CLIENT";
export const ADD_CLIENT_LIST = "ADD_CLIENT_LIST";
export const ADD_CHECKED_CLIENT_LIST = "ADD_CHECKED_CLIENT_LIST";
export const REMOVE_CLIENT_LIST = "REMOVE_CLIENT_LIST";
export const REMOVE_CLIENT = "REMOVE_CLIENT";
export const GET_CLIENTS = "GET_CLIENTS";
export const initialState = {
    clients: [
        /* {
             uuid: "",
             title: "",
             description: "",
             tags: [],
             lists: [],
             imageURL:"",
             createdDate:new Date
         }*/
    ],
    pageNumbers: [],
    loading: false,
    error: null,
    checkedList: [],
    bookList: [
        // {id : "", collectionName:"", uuid:[]}
    ],

};
const addClient = (state, client) => {

    if (client === []) return {
        ...state
    };
    let storedBook = state.clients.find(p => p.uuid === client.uuid);

    if (storedBook !== undefined && state.clients !== undefined) {
        console.log("update ");
        let newBooks = state.clients.map(p => {
            if (p.uuid === client.uuid) {

                return {
                    ...p,
                    description: client.description,
                    title: client.title,
                    tags: client.tags,
                    imageURL: client.imageURL
                };
            }
            return p;
        });
        return {
            ...state,
            clients: newBooks
        }
    }

    const newBooks = [...state.clients, client];

    return {
        ...state,
        clients: newBooks
    }
};
const removeBook = (state, id) => {
    let books = state.clients.filter(p => p.uuid !== id);
    return {
        ...state,
        clients: books
    }
};

const addBookList = (state, clientList) => {

    if (clientList === []) return {
        ...state
    };
    let storedListBook = state.bookList.find(p => p.uuid === clientList.uuid);

    if (storedListBook !== undefined && storedListBook.uuids !== undefined) {

        let newBooks = state.bookList.map(p => {
            if (p.uuid === clientList.uuid) {
                return {
                    ...p,
                    name: clientList.name,
                    uuids: clientList.uuids
                };
            }
            return p;
        });


        return {
            ...state,
            bookList: newBooks
        }
    }

    const newBookList = [...state.bookList, clientList];

    return {
        ...state,
        bookList: newBookList
    }
};
const removeBookList = (state, uuid) => {
    let lists = state.bookList.filter(p => p.uuid !== uuid);
    return {
        ...state,
        clients : lists,
        bookList: lists
    }
};
const addCheckedBookList = (state, bookList) => {

    console.log(bookList);
    /*    const newBookList = [...state.checkedList, bookList];
        return {
            ...state,
            checkedList: newBookList
        }*/

};
export const bookReducer = (state, action) => {

    switch (action.type) {
        case ADD_CLIENT: {
            return addClient(state, action.Book);
        }
        case REMOVE_CLIENT: {
            return removeBook(state, action.uuid);
        }
        case ADD_CLIENT_LIST: {
            return addBookList(state, action.bookList);
        }
        case REMOVE_CLIENT_LIST: {
            return removeBookList(state, action.uuid);
        }
        case ADD_CHECKED_CLIENT_LIST: {
            return addCheckedBookList(state, action.bookList);
        }
        default:
            return state;
    }
};
