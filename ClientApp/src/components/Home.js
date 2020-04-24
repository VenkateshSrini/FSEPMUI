import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserHome from './user/userHome';
import ProjectHome from './project/ProjectHome';
import TaskHome from './task/TaskHome';

export class Home extends Component {
    static displayName = Home.name;

  render () {
    return (
      <div>
            <Tabs defaultActiveKey="User" id="uncontrolled-tab-example">
                <Tab eventKey="User" title="User">
                    <UserHome />
                </Tab>
                <Tab eventKey="Project" title="Project">
                    <ProjectHome />
                </Tab>
                <Tab eventKey="Task" title="Task">
                    <TaskHome />
                </Tab>
            </Tabs>
      </div>
    );
  }
}
