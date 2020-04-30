import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TaskMod from './components/task/TaskMod';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    function getTaskItemForMod() {
        return null;
    }
    ReactDOM.render(
        <TaskMod onGetParam={getTaskItemForMod}/>
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});