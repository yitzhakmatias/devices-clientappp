import React, {useEffect, useReducer, useState} from 'react';
import BookContext from "./IClientContext";
import axios from 'axios';
import {
    bookReducer,
    ADD_CLIENT,
    REMOVE_CLIENT,
    initialState,
    GET_CLIENTS,
    ADD_CLIENT_LIST,
    REMOVE_CLIENT_LIST,
    ADD_CHECKED_CLIENT_LIST
} from "./reducers"


const GlobalState = props => {
    const [devices, setDevices] = useState([])

    const [state, dispatch] = useReducer(bookReducer, initialState, () => {
        if (!localStorage.hasOwnProperty('clients')) return initialState;
        const data = localStorage.getItem('clients');
        const booksList = localStorage.getItem('booksList');
        if (data === "undefined") return initialState;

        return data ? {
            clients: JSON.parse(data),
            count: JSON.parse(data).length,
            bookList: booksList !== null ? JSON.parse(booksList) : []
        } : [];
    });
    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(state.clients));
        localStorage.setItem('booksList', JSON.stringify(state.bookList));

        const fetchData = async () =>{

            try {
                const {data: response} = await axios.get('http://localhost:3000/devices');
                let res = JSON.stringify(response);
                setDevices(res);
            } catch (error) {
                console.error(error.message);
            }
        }

       fetchData();

    }, [state]);

    const addBook = (_client) => {

        dispatch({
            type: ADD_CLIENT, Book: {
                id : _client.id,
                uuid: _client.uuid,
                title: _client.title,
                description: _client.description,
                tags: _client.tags,
                imageURL: _client.imageURL,
                createdDate: _client.createdDate,
                lists: _client.lists,
                system_name : _client.system_name,
                type : _client.type,
                hdd_capacity: _client.hdd_capacity
            }
        })
    };
    const removeBook = (uuid) => {

        dispatch({type: REMOVE_CLIENT_LIST, uuid: uuid})
    };
    const addBookList = (_BookList) => {
        console.log(_BookList);
        dispatch({
            type: ADD_CLIENT_LIST, bookList: {
                id: _BookList.id,
                uuids: _BookList.uuids,
                name: _BookList.name,
            }
        })
    };
    const addCheckedBookList = (_BookList) => {

        dispatch({
            type: ADD_CHECKED_CLIENT_LIST, bookList: _BookList
        })

    };
    const removeBookList = (id) => {

        dispatch({type: REMOVE_CLIENT_LIST, id: id})
    };


    return (
        <BookContext.Provider value={{
            addBook: addBook,
            deleteBook: removeBook,
            Clients: state.clients ?? [],
            count: state.count,
            addBookList: addBookList,
            removeBookList: removeBookList,
            addCheckedBookList: addCheckedBookList,
            bookList: state.bookList ?? []
        }}>{props.children}
        </BookContext.Provider>

    )


};

export default GlobalState;
