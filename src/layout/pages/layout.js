import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainNavigation from "../../shared/pages/MainNavigation";
import Footer from "../../layout/pages/footer";
import Clients from "../../clients/pages/clients";
import users from "../../user/pages/user";
import book from "../../clients/components/client";
import bookCollection from "../../clientCollections/pages/clientCollection";

const layout = () => {
    return (
        <div >
            <Router>
                <MainNavigation/>
                <Switch>

                    <Route path="/" exact component={Clients}/>
                    <Route path="/books" exact component={Clients}/>
                    <Route path="/book" exact component={book}/>
                    <Route path="/users" exact component={users}/>
                    <Route path="/lists" exact component={bookCollection}/>
                    <Redirect to="/"/>
                </Switch>

            </Router>
            <Footer/>
        </div>

    );
};

export default layout;
