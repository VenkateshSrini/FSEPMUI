import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ProjectSearchModel from './components/project/ProjectSearchModel';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProjectSearchModel />
        , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});