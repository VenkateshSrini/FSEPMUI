import React, { Component, Fragment } from 'react';
import TaskList from './TaskList';
import TaskMod from './TaskMod';

export class TaskMaintainence extends Component {
    static displayName = TaskMaintainence.name;
    state = {
        showMode: false,
        item: null
    }
    toggle = (tskitem) => {

        this.setState(previous => ({
            showMode: !previous.showMode
        }));
        this.setState({ item: tskitem });

    }
    getTaskItemForMod = () => { return this.state.item; }
    render() {
       
        return <div>
            {this.state.showMode ? <TaskMod onToggle={this.toggle} onGetParam={this.getTaskItemForMod}/> : <TaskList onToggle={this.toggle}/>}
            
        </div>
    }
}
export default TaskMaintainence;