import React from 'react';
import ReactDOM from 'react-dom';
import TaskMaintainence from './components/Task/TaskMaintainence';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <TaskMaintainence />
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});