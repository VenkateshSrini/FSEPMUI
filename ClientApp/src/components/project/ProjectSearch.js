import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Table, Row, Col, Container } from 'reactstrap';
import { PRJCT_SERVICE_URL } from '../constants';
export class ProjectSearch extends Component {
    static displayName = ProjectSearch.name;
    state = {
        prjNM: '',
        prjItems: []
    }
    getProject = () => {
        fetch(`${PRJCT_SERVICE_URL}/GetAllActiveProject`)
            .then(res => {
                console.log("***********************");
                console.log(res.status)
                console.log("***********************");
                return res.json();
            })
            .then(resjsn => this.setState({ prjItems: resjsn }))
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
    componentDidMount() {
        this.getProject();
    }
    searchProject = e => {
        e.preventDefault();
        fetch(`${PRJCT_SERVICE_URL}/GetProjectByName?prjNm=${this.state.prjNM}`)
            .then(res => {
                console.log("***********************");
                console.log(res.status)
                console.log("***********************");
                return res.json();
            })
            .then(resjsn => this.setState({ prjItems: resjsn }))
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
    clearSearchCriteria = () => {
        this.setState({ prjNM: '' });
        this.getProject();
    }
    onRowSelect = (prjId, prjNm) => {
        this.props.onSelect(prjId, prjNm);
        this.props.onToggle();
    }

    render() {
        const items = this.state.prjItems;
        return <Container>
            <Row>
                <Form onSubmit={this.searchProject}>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="prjNM">Project Name</Label>
                            </Col>
                            <Col>
                                <Input type="text" name="prjNM" onChange={this.onChange} value={this.state.prjNM} />
                            </Col>
                            <Col>
                                <Button
                                    color="secondary"
                                    style={{ minWidth: '50px' }}
                                > Search</Button> <Button
                                    color="secondary"
                                    style={{ minWidth: '50px' }}
                                    onClick={() => this.clearSearchCriteria()}>Clear</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Row>
            <Row>
                <Table striped>
                    <thead className="thead-dark">
                        <tr>
                            <th style={{ textAlign: "center" }}></th>
                            <th>Project Id</th>
                            <th>Project description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {((!items) || (items.length <= 0)) ?
                            <tr><td colSpan="8" align="center"><b>No project found</b></td></tr>
                            : items.map(item => (
                                <tr key={item.projId}>
                                    <th scope="row">
                                        <Button
                                            color="info"
                                            style={{ minWidth: "10px" }}
                                            onClick={() => this.onRowSelect(item.projId, item.projectTitle)}>Select</Button>
                                    </th>
                                    <td>
                                        {item.projId}
                                    </td>
                                    <td>
                                        {item.projectTitle}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>

            </Row>
        </Container>
    }
}
export default ProjectSearch