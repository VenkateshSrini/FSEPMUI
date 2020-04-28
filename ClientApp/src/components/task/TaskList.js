import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

import '../../custom.css';
export class TaskList extends Component {
    static displayName = TaskList.name;
    
    click = () => {
       
        
    }
    componentDidMount() {
        alert('Load task list');
    }
    render() {
        var item = { id: 1 };
        //var item = this.props.location.state.detail;
       
        return <Fragment>
            <h1>TaskSearch andMod</h1>
            
                
            
           
            <div >
                <Button onClick={() => this.props.onToggle()}/>
            </div>
            

           
        </Fragment>;
    }
}
export default TaskList;