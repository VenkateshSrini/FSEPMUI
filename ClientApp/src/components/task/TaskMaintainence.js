import React, { Component, Fragment } from 'react';
import TaskList from './TaskList';
import TaskMod from './TaskMod';

export class TaskMaintainence extends Component {
    static displayName = TaskMaintainence.name;
    state = {
        showMode: false
    }
    toggle = () => {

        this.setState(previous => ({
            showMode: !previous.showMode
        }));

    }
    render() {
       
        return <div>
            {this.state.showMode ? <TaskMod onToggle={this.toggle}/> : <TaskList onToggle={this.toggle}/>}
            
        </div>
    }
}
export default TaskMaintainence;