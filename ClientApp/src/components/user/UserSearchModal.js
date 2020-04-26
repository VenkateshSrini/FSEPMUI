import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import UserSearch from './UserSearch';
export class UserSearchModal extends Component{
    static displayName = UserSearchModal.name;
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
                style={{ minWidth: "100px" }}>Search User</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} style={{minWidth:'500px'}}>
                <ModalHeader toggle={this.toggle}>User Search</ModalHeader>
                <ModalBody>
                    <UserSearch onSelect={this.props.onSelect} onToggle={this.toggle}>
                    </UserSearch>
                </ModalBody>
            </Modal>
        </Fragment>
    }
}
export default UserSearchModal