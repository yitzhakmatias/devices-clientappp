import React, {useContext, useEffect, useState} from 'react';
import ClientContext from "../../context/IClientContext";

import "./clientList.scss"
import ClientElement from "./clientElement";


const Clientlist = ({props, editBook}) => {
    const clientContext = useContext(ClientContext);

    const [clients, setClients] = React.useState([]);

    const [pagination, setPagination] = React.useState({
        currentPage: 1,
        pageSize: 5,
        pageNumbers: [],
        lastPage: 0
    });

    React.useEffect(() => {
        getData();
    }, [pagination.currentPage]);

    const getData = () => {
        const indexOfLastTodo = pagination.currentPage * pagination.pageSize;
        const indexOfFirstTodo = indexOfLastTodo - pagination.pageSize;
        setClients(clientContext.Clients.slice(indexOfFirstTodo, indexOfLastTodo));
        pageNumberList(clientContext.Clients);
    };
    const pageNumberList = (books) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(books.length / pagination.pageSize); i++) {
            pageNumbers.push(i);
        }
        setPagination({
            ...pagination,
            lastPage: pageNumbers.length - 1 > 0 ? pageNumbers.length : 0,
            pageNumbers: pageNumbers
        })

    };

    const renderPageNumbers = pagination.pageNumbers.map(number => {
        return (

            <li>
                <a className="pagination-link is-current" aria-label="Page 1" aria-current="page" id={number}
                   onClick={() => setPagination({
                       ...pagination, currentPage: Number(number)
                   })}>{number}</a>
            </li>
        );
    });
    const itemRows = clients.sort((a, b) => (a.createdDate < b.createdDate) ? 1 : -1).map((book, i) => (


        <ClientElement book={book} editBook={() => editBook(book.uuid)}
                       deleteBook={() => clientContext.deleteBook(book.uuid)}/>


    ));

    return (
        <div className="">


            {itemRows}


            <nav className="pagination" role="navigation" aria-label="pagination">
                <a className="pagination-previous" title="This is the first page"
                   onClick={() => setPagination({
                       ...pagination, currentPage: pagination.currentPage - 1 > 1 ? pagination.currentPage - 1 : 1
                   })}
                >Previous</a>
                <a className="pagination-next" onClick={() => setPagination({
                        ...pagination,
                        currentPage: pagination.currentPage + 1 < pagination.lastPage ? pagination.currentPage + 1 : pagination.lastPage
                    }
                )}>Next page</a>
                <ul className="pagination-list">
                    {renderPageNumbers}
                </ul>
            </nav>
        </div>);
};

export default Clientlist;
