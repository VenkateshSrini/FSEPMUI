import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import ProjectSearch from './ProjectSearch';
export class ProjectSearchModal extends Component {
    static displayName = ProjectSearchModal.name;
    state = {
        modal: false
    }
    toggle = () => {
        
            this.setState(previous => ({
                modal: !previous.modal
            }));
        
    }
    render() {
     
        return <Fragment>
            <Button
                color="info"
                onClick={this.toggle}
                style={{ minWidth: "100px" }} >Search Project</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} style={{ minWidth: '500px' }}>
                <ModalHeader toggle={this.toggle}>Project Search</ModalHeader>
                <ModalBody>
                    <ProjectSearch onSelect={this.props.onSelect} onToggle={this.toggle}>
                    </ProjectSearch>
                </ModalBody>
            </Modal>
        </Fragment>
    }
}
export default ProjectSearchModal;