import React from 'react';
import Client from "./client";

const ModalClient = ({book: client,isVisible}) => {
    return (
        <div className="modal  is-active">
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Book</p>
                    <button className="delete" aria-label="close" onClick={()=>isVisible()}/>
                </header>
                <section className="modal-card-body">
                   <Client client={client} save={()=>isVisible()}/>
                </section>
            </div>
        </div>

    );
};

export default ModalClient;
