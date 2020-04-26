import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Container, Row, Col } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import DatePicker from "react-datepicker";
import { PRJCT_SERVICE_URL } from '../constants';
import Checkbox from '../common/checkbox';
import "react-datepicker/dist/react-datepicker.css";
import UserSearchModal from '../user/UserSearchModal';

export class ProjectManagement extends Component {
    static displayName = ProjectManagement.name;

    state = {
        dateTimeMinValue: '0001-01-01T00:00:00Z',
        projId: '',
        projectTitle: '',
        startDate: null,
        endDate: null,
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
    handleCheckboxChange =e=> {
        if (e.target.checked) {
            var edate = new Date();
            edate.setDate(edate.getDate()+2)
            this.setState({
                IsSetDates: true, startDate: new Date(), 
                endDate:edate
            });

        }
        else {
            this.setState({
                IsSetDates: false, startDate: null,
                endDate: null
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
                priority: this.state.priority,
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
                priority: this.state.priority,
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
        var prjEdit = this.state.prjItems.find(item => item.projId.trim() === projId);
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
            startDate: null, endDate: null, buttonText: 'Add',
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
                    return (p1.startDate - p2.startDate)
                })
            });
        }
        if (sortAttribute === 'edt') {
            this.setState({
                prjItems: this.state.prjItems.sort((p1, p2) => {
                    return (p1.endDate - p2.endDate)
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
        this.setState({ pmUsrId: usrId });
    }
    render() {
        const gridItems = this.state.prjItems;
        return <Container>
            <Row>
                <Form onSubmit={this.formsubmitHandler} >
                    <FormGroup>
                        <Row>
                            <Col style={{ minWidth:'10%' }}>
                                <Label for="projectTitle">Project Title</Label>
                            </Col>
                            <Col>
                                <Input  type="text" name="projectTitle" onChange={this.onChange} value={this.state.projectTitle}
                                />
                            </Col>
                            
                           
                            <Col></Col>

                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col ></Col>
                            <Col style={{
                                minWidth: '200px'
                            }}>
                                
                                <Input for="IsSetDates"
                                    type="checkbox"
                                    value={this.state.IsSetDates}
                                    onChange={this.handleCheckboxChange}
                                    
                                /><Label>Set start and end Dates</Label>
                                   

                            </Col>
                            
                            <Col style={{
                                minWidth: '105px'
                            }}>
                                <Label for="startDate">Start Date:</Label>
                            </Col>
                            <Col>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={this.state.startDate}
                                    onChange={date => this.onStartDateChange(date)}
                                    isClearable
                                    disabled={!this.state.IsSetDates}
                                />
                            </Col>
                            <Col style={{
                                minWidth: '105px'
                            }}>
                                <Label for="endDate">End Date:</Label>
                            </Col>
                            <Col>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={this.state.endDate}
                                    onChange={date => this.onEndDateChange(date)} isClearable
                                    disabled={!this.state.IsSetDates}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                     
                                <Label for="Priority">Priority:</Label>
                            </Col>
                            <Col>
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
                            <Col></Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="pmUsrId">Project Manager:</Label>
                            </Col>
                            <Col>
                                <Input type="text" name="pmUsrId" onChange={this.onChange} value={this.state.pmUsrId}
                                    disabled={true} />
                            </Col>
                            <Col>
                                <UserSearchModal onSelect={this.onPMSelect} />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
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
            <Row><Col ><hr style={{
                margin: 'auto 10px',
                border: '1.5px solid rgb(150, 150, 150)'
            }} /><br/></Col></Row>
           
            <Row>
                <Form onSubmit={this.searchProject}>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="srchPrjName">Project Name</Label>
                            </Col>
                            <Col>
                                <Input type="text" name="srchPrjName" onChange={this.onChange} value={this.state.srchPrjName} />
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
                <Col>
                    <Label>Sort:</Label>&nbsp;&nbsp;<Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('sdt')}>Start Date</Button>&nbsp;&nbsp;<Button color="secondary"
                            style={{ minWidth: "50px" }} onClick={() => this.sortGrid('edt')}>End date</Button>&nbsp;&nbsp;<Button color="secondary"
                                style={{ minWidth: "50px" }} onClick={() => this.sortGrid('prty')}>Priority</Button>&nbsp;&nbsp;
                        <Button color="secondary"
                        style={{ minWidth: "50px" }} onClick={() => this.sortGrid('cmpltd')}>Completed</Button>
                </Col>
            </Row>
            <br/>
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
                                            <Col></Col>
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
                                            <Col></Col>
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
export default ProjectManagement