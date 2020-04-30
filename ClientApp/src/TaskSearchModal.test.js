import React from 'react';
import ReactDOM from 'react-dom';
import TaskSearchModal from './components/Task/TaskSearchModal';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <TaskSearchModal />
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});