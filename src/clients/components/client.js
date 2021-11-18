import React, {useContext, useEffect, useState} from 'react';
import "./client.scss";
import ReactTagInput from "@pathofdev/react-tag-input";
import BookContext from '../../context/IClientContext'
import {useForm} from "react-hook-form";
import uuid from 'react-uuid';

const Client = ({client, save}) => {
    const [tags, setTags] = useState([]);
    const [type, setType] = useState("");
    const {register, handleSubmit} = useForm({
        nativeValidation: true
    });
    const bookContext = useContext(BookContext);

    useEffect(() => {
        if (client !== undefined) {
            setTags(client.tags);
        }
    }, []);
    const handleChange =(e)=>{
        setType(e.target.value);
    }
    const onSubmit = (data, e) => {

        let uuidLocal;
        let existUUID = client !== undefined ? client.uuid !== undefined : true;

        while (existUUID) {
            uuidLocal = uuid();
            let data = bookContext.Clients.find(p => p.uuid === uuidLocal);
            existUUID = data !== undefined;
        }
        data.id = client !== undefined ? client.uuid : uuidLocal;
        data.uuid = client !== undefined ? client.uuid : uuidLocal;

        data.tags = tags;

        data.createdDate = new Date();
        data.type = type;
        fetch('https://loremflickr.com/g/320/240/laptop').then(r => {
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
                            <label className="label">System Name</label>
                            <div className="control">
                                <input className="input is-light" type="text" placeholder="Please enter  System Name "
                                       defaultValue={client !== undefined ? client.system_name : ""}
                                       ref={register({required: "Please enter  System Name"})}
                                       name="system_name"/>
                                <p className="help is-danger">Please enter System Name</p>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Type</label>
                            <div className="control">
                                <div className="select is-primary" >
                                    <select  defaultValue={client !== undefined ? client.type : ""}
                                             onChange={(e)=>setType(e.target.value)}
                                             value={client !== undefined ? client.type : ""}
                                             ref={register()}
                                    >
                                        <option selected  value="Windows Workstation">Windows Workstation</option>
                                        <option value="Windows Serve">Windows Serve</option>
                                        <option value="Mac">Mac</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="field">
                            <label className="label">HDD Capacity </label>
                            <div className="control">
                                <input className="input is-light" placeholder="Please enter a HDD Capacity..."
                                       defaultValue={client !== undefined ? client.hdd_capacity : ""}
                                       ref={register()}
                                       name="hdd_capacity"/>

                            </div>
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

