import React, { Component, Fragment } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
export class TaskMod extends Component {
    static displayName = TaskMod.name;
    componentDidMount() {
        alert('Load task mod');
    }
    render() {
       //var item = this.props.location.state.detail;
     
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h1>Products Page</h1>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup>
                            <ListGroup.Item>Product 1</ListGroup.Item>
                            <ListGroup.Item>Product 2</ListGroup.Item>
                            <ListGroup.Item>Product 3</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
                <Button onClick={() => this.props.onToggle()} />
            </div>
        );
    }
}
export default TaskMod;