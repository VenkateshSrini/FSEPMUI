import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Input, Label, Container, Row, Col } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PRJCT_SERVICE_URL } from '../constants';
import UserSearchModal from '../user/UserSearchModal';
import ProjectSearchModal from '../project/ProjectSearchModel';
import TaskSearchModal from './TaskSearchModal';
export class TaskMod extends Component {
    static displayName = TaskMod.name;
    state = {
        projectId: '',
        taskId: '',
        taskDescription: '',
        parentTaskId: '',
        parentDescription: '',
        priority: 0,
        status: 0,
        startDate: null,
        endDate: null,
        taskOwnerId: '',
        taskOwnerName: '',
        IsSetDates: false
    }


    componentDidMount() {
        var item = this.props.onGetParam();
        if (item != null) {
            
            this.setState({
                projectId: item.projectId, taskId: item.taskId, taskDescription: item.taskDescription,
                parentTaskId: item.parentTaskId, parentDescription: item.parentDescription, priority: item.priority,
                status: item.status, startDate: new Date(item.startDate), endDate: new Date(item.endDate),
                taskOwnerId: item.taskOwnerId,taskOwnerName: item.taskOwnerName});
            
        }
    }
    handleCheckboxChange = e => {
        if (e.target.checked) {
            var edate = new Date();
            edate.setDate(edate.getDate() + 2)
            this.setState({
                IsSetDates: true, startDate: new Date(),
                endDate: edate
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
    onTaskOwnerSelect = (usrId, empId) => {
        this.setState({ taskOwnerId: usrId });
    }
    onProjectSelect = (prjId, prjNm) => {
        this.setState({ projectId: prjId });
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onPrjParam = () => {
        return this.state.projectId;
    }
    onParentTaskSelect = (tskId, tskNm) => {
        this.state.setState({ parentTaskId: tskId, parentDescription: tskNm });
    }
    submitEdit = e => {
        e.preventDefault();
        if (this.state.projectId === '') {
            alert("Project id is empty");
            return;
        }
        if (this.state.taskId === '') {
            alert("Task id is empty");
            return;
        }
        var startDateStr = '';
        var monthPart = 0;
        var datePart = 0;
        var endDateStr = '';
        if (this.state.startDate != null) {
            startDateStr = this.state.startDate.getFullYear().toString();
            monthPart = this.state.startDate.getMonth() + 1;
            if (monthPart < 10)
                startDateStr = startDateStr + "-0" + monthPart.toString();
            else
                startDateStr = startDateStr + "-" + monthPart.toString();

            datePart = this.state.startDate.getDate();
            if (datePart < 10)
                startDateStr = startDateStr + "-0" + datePart.toString();
            else
                startDateStr = startDateStr + "-" + datePart.toString();

        }
        if (this.state.endDate != null) {
            endDateStr = this.state.endDate.getFullYear().toString();
            monthPart = this.state.endDate.getMonth() + 1;
            if (monthPart < 10)
                endDateStr = endDateStr + "-0" + monthPart.toString();
            else
                endDateStr = endDateStr + "-" + monthPart.toString();

            datePart = this.state.endDate.getDate();
            if (datePart < 10)
                endDateStr = endDateStr + "-0" + datePart.toString();
            else
                endDateStr = endDateStr + "-" + datePart.toString();

        }
        fetch(`${PRJCT_SERVICE_URL}/EditTask`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId: this.state.projectId,
                taskId: this.state.taskId,
                priority: this.state.priority,
                parentTaskId: this.state.parentTaskId,
                taskDescription: this.state.taskDescription,
                startDate: startDateStr,
                endDate: endDateStr,
                taskOwnerId: this.state.taskOwnerId
            })

        })
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                if (response.status == 202)
                    alert("Task successfully created");
                //console.log(res.json());
                console.log("******Get Any criteria******");
                //return response.json();
                // this.getProject();
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
    render() {
       //var item = this.props.location.state.detail;
     
        return <Container>
            <Row>
                <Form onSubmit={this.submitEdit}>
                    <FormGroup>
                        <Row>
                            <Col style={{ minWidth: '125px' }}>
                                <Label for="projectId">Project</Label>
                            </Col>
                            <Col style={{ minWidth: '300px' }}>

                                <Input type="text" name="projectId" onChange={this.onChange} value={this.state.projectId}
                                    disabled={true} />

                            </Col>
                            <Col style={{ minWidth: '300px' }}>
                               
                            </Col>
                            <Col />
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col style={{ minWidth: '125px' }}>
                                <Label for="taskDescription">Task</Label>
                            </Col>
                            <Col style={{ minWidth: '300px' }}>
                                <Input type="text" name="taskDescription" onChange={this.onChange}
                                    value={this.state.taskDescription} />
                            </Col>
                            <Col style={{ minWidth: '300px' }} />
                            <Col />
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col ></Col>
                            <Col style={{
                                minWidth: '200px'
                            }}>

                                <Input name="IsSetDates"
                                    type="checkbox"
                                    value={this.state.IsSetDates}
                                    onChange={this.handleCheckboxChange}

                                /><Label>Set start and end Dates</Label>


                            </Col>
                            <Col />
                            <Col />
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col style={{ minWidth: '125px' }}>
                                <Label for="Priority">Priority</Label>
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
                            <Col style={{ minWidth: '300px' }} />
                            <Col />
                        </Row>

                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col style={{ minWidth: '125px' }}>
                                <Label for="parentTaskId">Parent Task</Label>
                            </Col>
                            <Col style={{ minWidth: '300px' }}>
                                <Input type="text" name="parentTaskId" onChange={this.onChange}
                                    value={this.state.parentTaskId} disabled={true} />
                            </Col>
                            <Col style={{ minWidth: '300px' }}>
                                <TaskSearchModal onSelect={this.onParentTaskSelect}
                                    onGetParam={this.onPrjParam} />
                            </Col>
                            <Col />
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col style={{
                                minWidth: '110px'
                            }}>
                                <Label for="startDate">Start Date</Label>
                            </Col>
                            <Col style={{ minWidth: '200px' }}>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={this.state.startDate}
                                    onChange={date => this.onStartDateChange(date)}
                                    isClearable
                                    disabled={!this.state.IsSetDates}
                                />
                            </Col>
                            <Col style={{
                                minWidth: '110px'
                            }}>
                                <Label for="endDate">End Date</Label>
                            </Col>
                            <Col style={{ minWidth: '300px' }}>
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
                            <Col style={{ minWidth: '125px' }}>
                                <Label for="taskOwnerId">Task Owner</Label>
                            </Col>
                            <Col style={{ minWidth: '300px' }}>
                                <Input type="text" name="taskOwnerId" onChange={this.onChange}
                                    value={this.state.taskOwnerId} disabled={true} />
                            </Col>
                            <Col style={{ minWidth: '300px' }} >
                                <UserSearchModal onSelect={this.onTaskOwnerSelect} />
                            </Col>
                            <Col />
                        </Row>

                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col />
                            <Col>
                                <Button
                                    color="secondary"
                                    style={{ minWidth: "200px" }}>Modify</Button>
                            </Col>
                            <Col ><Button
                                color="secondary"
                                style={{ minWidth: "200px" }}
                                onClick={() => this.props.onToggle(null)}>Return</Button>
                            </Col>
                            <Col />
                        </Row>
                    </FormGroup>
                </Form>
            </Row>
        </Container>;
    }
}
export default TaskMod;