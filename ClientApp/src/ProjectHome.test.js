import React from 'react';
import ReactDOM from 'react-dom';
import ProjectHome from './components/project/ProjectHome';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProjectHome />
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});