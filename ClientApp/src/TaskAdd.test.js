import React from 'react';
import ReactDOM from 'react-dom';
import TaskAdd from './components/Task/TaskAdd';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <TaskAdd />
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});