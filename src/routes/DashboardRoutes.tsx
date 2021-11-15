import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HeroScreen } from "../pages/about/HeroScreen";
import { HomePage } from "../pages/home/HomePage";
import { Navbar } from '../components/Navbar';


export const DashboardRoutes = () => {


    return (
        <>
            <Navbar/>

            <div >
                <Switch>
                    <Route exact path="/hero/:heroeId" component={ HeroScreen } />
                    <Route exact path="/home" component={ HomePage } />

                    <Redirect to="/home" />
                </Switch>
            </div>


        </>
    )
}
