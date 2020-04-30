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
        srchfName: ''
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
       // alert(userEdit.id);
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
            searchParam.append('fName', this.state.srchfName)
        if (this.state.srchlName != '')
            searchParam.append('lName', this.state.srchlName)

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
    clearCriteria = e => {
        this.setState({ srchEMpId: '', srchfName: '', srchlName: '' });
        this.getUsers();
    }
    
    sortGrid = (sortAttribute) => {
        if (sortAttribute === 'eid') {
            this.setState({
                userItms: this.state.userItms.sort((i1, i2) => {
                    if (i1.employeeId < i2.employeeId)
                        return -1;
                    else if (i1.employeeId === i2.employeeId)
                        return 0;
                    else
                        return 1;
                })
            });
        }
        if (sortAttribute === 'fn') {
            this.setState({
                userItms: this.state.userItms.sort((i1, i2) => {
                    if (i1.firstName < i2.firstName)
                        return -1;
                    else if (i1.firstName === i2.firstName)
                        return 0;
                    else
                        return 1;
                })
            });
        }
        if (sortAttribute === 'ln') {
            this.setState({
                userItms: this.state.userItms.sort((i1, i2) => {
                    if (i1.lastName < i2.lastName)
                        return -1;
                    else if (i1.lastName === i2.lastName)
                        return 0;
                    else
                        return 1;
                })
            });
        }

    }
    
    render() {
        const gridItems = this.state.userItms;
        return <Container>
            <Row>
                <Col>
                    <Form onSubmit={this.formubmitHandler}>
                        <FormGroup>
                            <Row>
                                <Col style={{ minWidth:'80px' }}>
                                    <Label for="employeeId">EmployeeId :</Label>
                                </Col>
                                <Col style={{ minWidth: '350px' }}>
                                    <Input type="text" name="employeeId" onChange={this.onChange} value={this.state.employeeId}
                                    />
                                </Col>
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                            </Row>
                            <Row>
                                <Col style={{ minWidth: '80px' }}>
                                    <Label for="employeeId">First Name :</Label>
                                    
                                </Col>
                                <Col style={{ minWidth: '350px' }}>
                                    <Input type="text" name="firstName" onChange={this.onChange} value={this.state.firstName}
                                    />
                                 </Col>
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                            </Row>
                            <Row>
                                <Col style={{ minWidth: '80px' }}>
                                    <Label for="employeeId">Last Name :</Label>
                                    
                                </Col>
                                <Col style={{ minWidth: '350px' }}>
                                    <Input type="text" name="lastName" onChange={this.onChange} value={this.state.lastName}
                                    />
                                </Col>
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                            </Row>
                            <Row>
                            <Col/>
                                <Col>
                                    <Button
                                        color="secondary"

                                        style={{ minWidth: "100px" }}>{this.state.buttonText}</Button>
                                </Col>
                                <Col>
                                    <Button
                                        color="secondary"
                                        onClick={() => this.clearForm}
                                        style={{ minWidth: "100px" }}>Clear</Button>
                                </Col>
                                
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row><Col ><hr style={{
                margin: 'auto 10px',
                border: '1.5px solid rgb(150, 150, 150)'
            }} /><br /></Col></Row>
            <Row>
                <Col>
                    <Form onSubmit={this.searchUser}>
                        <FormGroup>
                            <Row>
                            <Col>
                                <Label for="srchEMpId">EmployeeId :</Label>
                                <Input type="text" name="srchEMpId" onChange={this.onChange} value={this.state.srchEMpId}
                                />
                            </Col>
                            <Col>
                                <Label for="srchlName">Last Name :</Label>
                                <Input type="text" name="srchlName" onChange={this.onChange} value={this.state.srchlName} />
                            </Col>
                            <Col>
                                <Label for="srchfName">First Name :</Label>
                                <Input type="text" name="srchfName" onChange={this.onChange} value={this.state.srchfName} />
                            </Col>
                                <Col>
                                    <br />
                                   

                                <Button
                                        color="secondary"
                                        style={{ minWidth: "50px", alignSelf: 'down', top: '95%' }}
                                    > Search</Button> <Button
                                        color="secondary"
                                        style={{ minWidth: "50px" }}
                                        onClick={() => this.clearCriteria()}>Clear</Button>
                            </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Sort:</Label>&nbsp;&nbsp;<Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('eid')}>EmployeeId</Button>&nbsp;&nbsp;<Button color="secondary"
                            style={{ minWidth: "50px" }} onClick={() => this.sortGrid('fn')}>First Name</Button>&nbsp;&nbsp;<Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('ln')}>Last Name</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            ((!gridItems) || (gridItems.length <= 0)) ?
                                <ListGroup.Item variant="danger">No Item Found </ListGroup.Item>
                                : gridItems.map(item => (
                                    <ListGroup.Item key={item.id}>
                                        <Row style={{ minHeight: "10px" }}>
                                            <Col>
                                                EmployeeId:  {item.employeeId}
                                            </Col>
                                            <Col>
                                                <Button color="warning" onClick={() => this.populatePropForEdit(item.id)} style={{ minWidth: "200px" }}>Edit</Button><br />

                                            </Col>
                                        </Row>
                                        <Row style={{ minHeight: "10px" }}>
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