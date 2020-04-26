import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import { ProjectManagement } from './ProjectManagement';

export class ProjectHome extends Component {
    static displayName = ProjectHome.name;

    render() {
        return (
            <div>
                <ProjectManagement/>
                
            </div>
        );
    }
}
export default ProjectHome;
