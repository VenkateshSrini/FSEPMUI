import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Table, Row, Col, Container } from 'reactstrap';
import { USR_SERVICE_URL } from '../constants';
export class UserSearch extends Component {
    static displayName = UserSearch.name;
    state = {
        userId: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        userItms: []
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
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    searchUser = e => {
        e.preventDefault();
        const searchParam = new URLSearchParams();
        if (this.state.employeeId != '')
            searchParam.append('empId', this.state.employeeId);
        if (this.state.firstName != '')
            searchParam.append('fName', this.state.firstName)
        if (this.state.lastName != '')
            searchParam.append('lName', this.state.lastName)

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
        this.setState({ employeeId: '', firstName: '', lastName: '' });
        this.getUsers();
    }
    onRowSelect = (usrId, empId) => {
        this.props.onSelect(usrId, empId);
        this.props.onToggle();
    }
    render() {
        const items = this.state.userItms;
        return <Container>
            <Row>
                <Col>
                    <Form onSubmit={this.searchUser}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="employeeId">Id :</Label>
                                </Col>
                                <Col>
                                    <Input type="text" name="employeeId" onChange={this.onChange} value={this.state.employeeId}
                                    />
                                </Col>
                                </Row><Row>
                                <Col>
                                    <Label for="lastName">Last Name :</Label>
                                </Col>
                                <Col>
                                    <Input type="text" name="lastName" onChange={this.onChange} value={this.state.lastName} />
                                </Col>
                            </Row><Row>
                                <Col>
                                    <Label for="firstName">First Name :</Label>
                                </Col>
                                <Col>
                                    <Input type="text" name="firstName" onChange={this.onChange} value={this.state.firstName} />
                                </Col>
                                </Row><Row>
                                <Col>
                                    <Button
                                        color="secondary"
                                        style={{ minWidth: "50px", alignSelf: 'down', top: '95%' }}
                                    > Search</Button>
                                </Col>
                                <Col>
                                     <Button
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
                <Table striped>
                    <thead className="thead-dark">
                        <th style={{ textAlign: "center" }}></th>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </thead>
                    <tbody>
                        {((!items) || (items.length <= 0)) ?
                            <tr><td colSpan="8" align="center"><b>No Tasks yet</b></td></tr>
                            : items.map(item => (
                                <tr key={item.id}>
                                    <th scope="row">
                                        <Button
                                            color="info"
                                            style={{ minWidth: "10px" }}
                                            onClick={() => this.onRowSelect(item.id, item.employeeId)}>Select</Button>
                                    </th>
                                    <td>
                                        {item.employeeId}
                                    </td>
                                    <td>
                                        {item.firstName}
                                    </td>
                                    <td>
                                        {item.lastName}
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    }
}
export default UserSearch