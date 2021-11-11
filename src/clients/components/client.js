import React, {useContext, useEffect, useState} from 'react';
import "./client.scss";
import ReactTagInput from "@pathofdev/react-tag-input";
import BookContext from '../../context/IClientContext'
import {useForm} from "react-hook-form";
import uuid from 'react-uuid'

const Client = ({client, save}) => {
    const [tags, setTags] = useState([]);
    const {register, handleSubmit} = useForm({
        nativeValidation: true
    });
    const bookContext = useContext(BookContext);

    useEffect(() => {
        if (client !== undefined) {
            setTags(client.tags);
        }
    }, []);

    const onSubmit = (data, e) => {

        let uuidLocal;
        let existUUID = client !== undefined ? client.uuid !== undefined : true;

        while (existUUID) {
            uuidLocal = uuid();
            let data = bookContext.Clients.find(p => p.uuid === uuidLocal);
            existUUID = data !== undefined;
        }
        data.uuid = client !== undefined ? client.uuid : uuidLocal;

        data.tags = tags;

        data.createdDate = new Date();

        fetch('https://loremflickr.com/g/320/240/book').then(r => {
            console.log(r);
            data.imageURL = r.url;
            bookContext.addBook(data);
            e.target.reset();

        });
        if (client !== undefined)
            save();
    };
    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="tile is-ancestor">

                <div className="tile is-parent">
                    <div className="tile is-child box">

                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input className="input is-light" type="text" placeholder="Please enter  Title "
                                       defaultValue={client !== undefined ? client.title : ""}
                                       ref={register({required: "Please enter  Title"})}
                                       name="title"/>
                                <p className="help is-danger">Please enter Title</p>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea is-light" placeholder="Please enter  Client Description..."
                                          defaultValue={client !== undefined ? client.description : ""}
                                          ref={register({required: "Please enter  Client Description"})}
                                          name="description"/>

                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Image URL </label>
                            <div className="control">
                                <input className="input is-light" placeholder="Please enter a URL..."
                                       defaultValue={client !== undefined ? client.imageURL : ""}
                                       ref={register()}
                                       name="url"/>

                            </div>
                        </div>
                        <div className="container">
                            <label className="label">Client Tags</label>
                            <ReactTagInput
                                className="input is-light"
                                tags={tags}
                                placeholder="Type and press enter"
                                onChange={(newTags) => setTags(newTags)}

                            />
                        </div>
                        <br/>
                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                <button className="button is-primary">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light" onClick={() => save()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </form>

    );
};

export default Client;

