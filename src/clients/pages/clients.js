import React, {useContext, useState} from 'react';

import Clientlist from '../components/clientlist'
import ModalClient from "../components/modalClient";
import Client from "../components/client";
import BookContext from "../../context/IClientContext";


const Clients = () => {
    const [showModal, setShowModal] = useState(false);
    const [client, setClient] = useState({});
    const bookContext = useContext(BookContext);

    const inputChangeHandler = (uuid) => {
        let book = bookContext.Clients.find(p => p.uuid === uuid);
        setClient(book);
        setShowModal(true);
    };
    const handleVisibility = () => {

        setShowModal(false);
    };
    return (

        <section className="section">
            <div className="tile is-ancestor">
                <div className="tile is-3 is-vertical is-parent">

                    <Client/>
                </div>
                <div className="tile is-parent">
                        {showModal ?
                            <ModalClient book={client} isVisible={() => handleVisibility()}/>
                            : null}

                        <article className="panel is-primary has-background-white">
                            <p className="panel-heading">
                                Client List
                            </p>

                            <div className="panel-block">
                                <p className="control has-icons-left">
                                    <input className="input is-primary" type="text" placeholder="Search"/>
                                    <span className="icon is-left">
                     <i className="fas fa-search" aria-hidden="true"> </i>
                     </span>
                                </p>
                            </div>
                            <div className="panel-block">
                                <Clientlist editBook={inputChangeHandler}/>
                            </div>

                        </article>

                </div>
            </div>

        </section>

    );
};

export default Clients;
