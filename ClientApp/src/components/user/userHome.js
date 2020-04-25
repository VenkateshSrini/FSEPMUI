import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import UserManagement from './UserManagements';
export class UserHome extends Component {
    static displayName = UserHome.name;

    render() {
        return (
            <div>
                <UserManagement/>
                
            </div>
        );
    }
    
}
export default UserHome;
