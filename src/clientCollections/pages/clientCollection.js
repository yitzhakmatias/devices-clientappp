import React, {Component, useContext, useState} from 'react';
import NewBookCollection from "../component/form";
import CollectionList from "../component/collectionList";
import BookContext from "../../context/IClientContext";

const ClientCollection = () => {
    const [id, setClientIdCollection] = useState({});
    const bookContext = useContext(BookContext);

    function editListOfBooks(id) {
        let collection = bookContext.bookList.filter(p => p.id === id)[0];
        setClientIdCollection(collection.id);
    }

    return (
        <section className="section">
            <div className="tile is-ancestor">
                <div className="tile is-parent is-3">
                    <CollectionList editListOfClients={editListOfBooks}/>
                </div>
                <div className="tile is-parent ">
                    <article className="tile is-child box">
                        <p className="title">Add New Client Collection</p>
                        <p className="subtitle">With some content</p>
                        <NewBookCollection id={id}/>
                    </article>
                </div>
            </div>
        </section>);

}

export default ClientCollection;
