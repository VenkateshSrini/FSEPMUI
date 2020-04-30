import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TaskSearch from './components/task/TaskSearch';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    function getTaskItemForMod() {
        return '';
    }
    ReactDOM.render(
        <TaskSearch onGetParam={getTaskItemForMod} />
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});