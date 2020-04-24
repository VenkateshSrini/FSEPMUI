import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
export class TaskHome extends Component {
    static displayName = TaskHome.name;

    render() {
        return (
            <div>
                <h1><center>Task Management</center></h1>
                <p>Welcome to your Task home page</p>
                
            </div>
        );
    }
}
export default TaskHome;