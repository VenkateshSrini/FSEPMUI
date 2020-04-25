import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Table, Row, Col, Container } from 'reactstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { USR_SERVICE_URL } from '../constants';
export class UserManagements extends Component {
    static displayName = UserManagements.name;
    state = {
        userId: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        IsMod: false,
        buttonText: 'Add',
        userItms: [],
        srchEMpId: '',
        srchlName: '',
        srchfName:''
    }
    getUsers = () => {
        fetch(`${USR_SERVICE_URL}/GetAllEmployee`)
            .then(res => {
                console.log("***********************");
                console.log(res.status)
                console.log("***********************");
                return res.json();
            })
            .then(resjsn => this.setState({ userItms: resjsn }))
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
    componentDidMount() {
        this.getUsers();
    }
    populatePropForEdit = userId => {
        var userEdit = this.state.userItms.find(item => item.id.trim() === userId);
        alert(userEdit.id);
        this.setState({
            IsMod: true, userId: userEdit.id, employeeId: userEdit.employeeId,
            firstName: userEdit.firstName, lastName: userEdit.lastName, buttonText: 'Modify'
        });
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USR_SERVICE_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: this.state.employeeId,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })

        })
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                //console.log(res.json());
                console.log("******Get Any criteria******");
                return response.json();
            })
            .then(jsn => this.getUsers())
            .catch(err => {
                console.log(err);
                alert(err);
            });

    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USR_SERVICE_URL}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: this.state.employeeId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                id: this.state.userId
            })

        })
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                //console.log(res.json());
                console.log("******Get Any criteria******");
                //return response.json();
            })
            .then(jsn => this.getUsers())
            .catch(err => {
                console.log(err);
                alert(err);
            });

    }
    delUser = userId => {
        let confirmClose = window.confirm("Are you sure you want to Delete the User");
        if (confirmClose) {
            fetch(`${USR_SERVICE_URL}?empId=${userId}`, {
                method: 'delete',
            })
                .then(res => {
                    console.log("******************");
                    console.log(res.status);
                    //console.log(res.json());
                    console.log("******************");
                    this.getUsers();

                })
                .catch(err => {
                    console.log(err);
                    alert(err);
                });

        }

    }
    formubmitHandler = e => {
        if (this.state.IsMod) {
            this.submitEdit(e);
        }
        else {
            this.submitNew(e);
        }

    }
    clearForm = e => {
        e.preventDefault();
        this.setState({
            IsMod: false, userId: '', employeeId: '',
            firstName: '', lastName: '', buttonText: 'Add'
        });
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    searchUser = e => {
        e.preventDefault();
        const searchParam = new URLSearchParams();
        if (this.state.srchEMpId != '')
            searchParam.append('empId', this.state.srchEMpId);
        if (this.state.srchfName != '')
            searchParam('fName', this.state.srchfName)
        if (this.state.srchlName != '')
            searchParam('lName', this.state.srchlName)

        fetch(`${USR_SERVICE_URL}/SearchUser?${searchParam.toString()}`)
            .then(res => {
                console.log("***********************");
                console.log(res.status)
                console.log("***********************");
                return res.json();
            })
            .then(resjsn => this.setState({ userItms: resjsn }))
            .catch(err => {
                console.log(err);
                alert(err);
            });

    }
    render() {
        const gridItems = this.state.userItms;
        return <Container>
            <Row>
                <Col>
                    <Form onSubmit={this.formubmitHandler}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="employeeId">EmployeeId :</Label>
                                    <Input type="text" name="employeeId" onChange={this.onChange} value={this.state.employeeId}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="employeeId">First Name :</Label>
                                    <Input type="text" name="firstName" onChange={this.onChange} value={this.state.firstName}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="employeeId">Last Name :</Label>
                                    <Input type="text" name="lastName" onChange={this.onChange} value={this.state.lastName}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        color="secondary"

                                        style={{ minWidth: "200px" }}>{this.state.buttonText}</Button>
                                </Col>
                                <Col>
                                    <Button
                                        color="secondary"
                                        onClick={() => this.clearForm}
                                        style={{ minWidth: "200px" }}>Clear</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            ((!gridItems) || (gridItems.length <= 0)) ?
                                <ListGroup.Item variant="danger">No Item Found </ListGroup.Item>
                                : gridItems.map(item => (
                                    <ListGroup.Item  >
                                        <Row style={{minHeight: "10px"}}>
                                            <Col>
                                                EmployeeId:  {item.employeeId}
                                            </Col>
                                            <Col>
                                                <Button color="warning" onClick={() => this.populatePropForEdit(item.id)} style={{ minWidth: "200px" }}>Edit</Button><br />

                                            </Col>
                                        </Row>
                                        <Row style={{minHeight: "10px"}}>
                                            <Col >
                                                First Name: {item.firstName}
                                            </Col>
                                            
                                        </Row>
                                        <Row>
                                            <Col>
                                                Last Name: {item.lastName}
                                            </Col>
                                            <Col>
                                                <Button color="danger" onClick={() => this.delUser(item.employeeId)} style={{ minWidth: "200px" }}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                ))

                        }
                    </ListGroup>

                </Col>
            </Row>
        </Container>;
    }
}
export default UserManagements