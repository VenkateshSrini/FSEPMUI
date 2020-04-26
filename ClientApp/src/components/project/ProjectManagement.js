import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Container, Row, Col } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import DatePicker from "react-datepicker";
import { PRJCT_SERVICE_URL } from '../constants';
import Checkbox from '../common/Checkbox';
import UserSearchModal from '../user/UserSearchModal';

export class ProjectManagement extends Component {
    static displayName = ProjectManagement.name;
     
    state = {
        dateTimeMinValue = '0001-01-01T00:00:00Z',
        projId: '',
        projectTitle: '',
        startDate: new Date(dateTimeMinValue),
        endDate: new Date(dateTimeMinValue),
        pmUsrId: '',
        pmUsrName: '',
        totalTaskCount: 0,
        completedTaskCount: 0,
        priority: 0,
        IsMod: false,
        buttonText: 'Add',
        srchPrjName: '',
        prjItems: [],
        IsSetDates: false
    }
    componentDidMount() {
        this.getProject();
    }
    handleCheckboxChange = e => {
        if (e.target.checked) {
            this.setState({
                IsSetDates: true, startDate: new Date().getDate(),
                endDate: (startDate.getDate() + 2)
            });
            
        }
        else {
            this.setState({
                IsSetDates: false, startDate: new Date(dateTimeMinValue),
                endDate: new Date(dateTimeMinValue)
            });
            
        }
    }
    sliderChange = e => {
        // console.log("changeValue triggered");
        this.setState({ priority: e.target.value });
    };
    onStartDateChange = paramDate => {
        this.setState({ startDate: paramDate });
    }
    onEndDateChange = paramDate => {
        this.setState({ endDate: paramDate });
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
    searchProject = e => {
        e.preventDefault();
        fetch(`${PRJCT_SERVICE_URL}/GetProjectByName?prjNm=${this.state.srchPrjName}`)
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
    submitNew = e => {
        e.preventDefault();
        fetch(`${PRJCT_SERVICE_URL}/AddProject`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectTitle: this.state.projectTitle,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                priority: thi.state.priority,
                pmUsrId: this.state.pmUsrId
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
        fetch(`${PRJCT_SERVICE_URL}/EditProject`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projId: this.state.projId,
                projectTitle: this.state.projectTitle,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                priority: thi.state.priority,
                pmUsrId: this.state.pmUsrId
            })

        })
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                //console.log(res.json());
                console.log("******Get Any criteria******");
                
            })
            .then(jsn => this.getUsers())
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
    suspend = projId => {
        e.preventDefault();
        fetch(`${PRJCT_SERVICE_URL}/EditProject?projId=${projId}`, {
            method: 'put'
        })
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                //console.log(res.json());
                console.log("******Get Any criteria******");

            })
            .then(jsn => this.getUsers())
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
    populatePropForEdit = projId => {
        var prjEdit = this.state.userItms.find(item => item.projId.trim() === projId);
        alert(prjEdit.id);
        this.setState({
            IsMod: true, projId: prjEdit.id, projectTitle: prjEdit.projectTitle,
            startDate: prjEdit.startDate, endDate: prjEdit.endDate, buttonText: 'Modify',
            pmUsrId: prjEdit.pmUsrId, priority: prjEdit.priority
        });
    }
    clearEdit = () => {
        this.setState({
            IsMod: false, projId: '', projectTitle: '',
            startDate: new Date(this.state.dateTimeMinValue), endDate: new Date(this.state.dateTimeMinValue), buttonText: 'Add',
            pmUsrId: '', priority: ''
        });
    }
    formsubmitHandler = e => {
        if (this.state.IsMod) {
            this.submitEdit(e);
        }
        else {
            this.submitNew(e);
        }

    }
    clearSearchCriteria = () => {
        this.state({ srchPrjName: '' });
        this.getProject();
    }
    sortGrid = sortAttribute => {
        if (sortAttribute === 'sdt') {
            this.setState({
                prjItems: this.state.prjItems.sort((p1, p2) => {
                    return (p1.startDate.getDate() - p2.startDate.getDate())
                })
            });
        }
        if (sortAttribute === 'edt') {
            this.setState({
                prjItems: this.state.prjItems.sort((p1, p2) => {
                    return (p1.endDate.getDate() - p2.endDate.getDate())
                })
            });
        }
        if (sortAttribute === 'prty') {
            this.setState({
                prjItems: this.state.prjItems.sort((p1, p2) => {
                    return (p1.priority - p2.priority)
                })
            });
        }
        if (sortAttribute === 'cmpltd') {
            this.setState({
                prjItems: this.state.prjItems.sort((p1, p2) => {
                    return (p1.completedTaskCount - p2.completedTaskCount)
                })
            });
        }
    }
    onPMSelect = (usrId, empId) => {
        this.setState({ pmUsrId: usrId});
    }
    render() {
        const gridItems = this.state.prjItems;
        return <Container>
            <Row>
                <Form onSubmit={this.formsubmitHandler}>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="projectTitle">EmployeeId :</Label>
                                <Input type="text" name="projectTitle" onChange={this.onChange} value={this.state.projectTitle}
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Checkbox
                                    label='Set start date end date'
                                    isSelected={false}
                                    onCheckboxChange={this.handleCheckboxChange}
                                />
                                <Label for="startDate">Start Date:</Label>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={startDate}
                                    onChange={date => this.onStartDateChange(date)}
                                />
                                <Label for="endDate">End Date:</Label>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={startDate}
                                    onChange={date => this.onEndDateChange(date)}
                                />
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Label for="Priority">Priority:</Label>
                            <ReactBootstrapSlider
                                value={this.state.priority}
                                change={this.sliderChange}
                                slideStop={this.sliderChange}
                                step={1}
                                max={30}
                                min={0}
                                orientation="horizontal"
                                reversed={false}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label for="pmUsrId">Priority:</Label>
                                <UserSearchModal onSelect={this.onPMSelect}/>
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
                                    onClick={() => this.clearEdit}
                                    style={{ minWidth: "200px" }}>Clear</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Row>
            <Row>
                <Form onSubmit={this.searchProject}>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="srchPrjName">Project Name</Label>
                                <Input type="text" name="srchPrjName" onChange={this.onChange} value={this.state.srchPrjName}/>
                            </Col>
                            <Col>
                                <br />


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
                <Col>
                    <Label>Sort:</Label>&nbsp;&nbsp;<Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('sdt')}>Start Date</Button>&nbsp;&nbsp;<Button color="secondary"
                            style={{ minWidth: "50px" }} onClick={() => this.sortGrid('edt')}>End date</Button>&nbsp;&nbsp;<Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('prty')}>Priority</Button>&nbsp;&nbsp;
                        <Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('cmpltd')}>Completed</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            ((!gridItems) || (gridItems.length <= 0)) ?
                                <ListGroup.Item variant="danger">No Item Found </ListGroup.Item>
                                : gridItems.map(item => (
                                    <ListGroup.Item  >
                                        <Row style={{ minHeight: "10px" }}>
                                            <Col>
                                                Project:  {item.projectTitle}
                                            </Col>
                                            <Col>
                                                <Button color="warning"
                                                    onClick={() => this.populatePropForEdit(item.projId)}
                                                    style={{ minWidth: "200px" }}>
                                                    Edit</Button>

                                            </Col>
                                        </Row>
                                        <Row style={{ minHeight: "10px" }}>
                                            <Col >
                                                No. of Tasks: {item.totalTaskCount}
                                            </Col>
                                            <Col>
                                                Completed: {item.completedTaskCount}
                                            </Col>
                                            
                                        </Row>
                                        <Row>
                                            <Col>
                                                Start Date: {item.startDate}
                                            </Col>
                                            <Col>
                                                End date:{item.endDate}
                                            </Col>
                                            <Col>
                                                <Button color="danger" onClick={() => this.suspend(item.projId)}
                                                    style={{ minWidth: "200px" }}>
                                                    Supend</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                ))

                        }
                    </ListGroup>

                </Col>
            </Row>
        </Container>
    }
}
export default UserManagements