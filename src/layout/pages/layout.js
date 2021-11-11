import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainNavigation from "../../shared/pages/MainNavigation";
import Footer from "../../layout/pages/footer";
import Clients from "../../clients/pages/clients";
import users from "../../user/pages/user";
import book from "../../clients/components/client";
import clientCollection from "../../clientCollections/pages/clientCollection";

const layout = () => {
    return (
        <div >
            <Router>
                <MainNavigation/>
                <Switch>

                    <Route path="/" exact component={Clients}/>
                    <Route path="/clients" exact component={Clients}/>
                    <Route path="/client" exact component={book}/>
                    <Route path="/users" exact component={users}/>
                    <Route path="/lists" exact component={clientCollection}/>
                    <Redirect to="/"/>
                </Switch>

            </Router>
            <Footer/>
        </div>

    );
};

export default layout;
