import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    useHistory
  } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginPage } from '../pages/login/LoginPage';
import { DashboardRoutes } from './DashboardRoutes';
import { useSelector} from 'react-redux'



export const AppRouter = () => {
    
    const {isAuth} = useSelector((state: any) => state.login)

    return (
        <Router>
            <div>
                <Switch> 
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginPage } 
                        isAuthenticated={ isAuth }
                    />
                    
                    <PrivateRoute 
                        path="/" 
                        component={ DashboardRoutes } 
                        isAuthenticated={ isAuth }
                    />
                </Switch>
            </div>
        </Router>
    )
}
