import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ProjectSearch from './components/project/ProjectSearch';

Enzyme.configure({ adapter: new Adapter() });
beforeAll(() => {
    global.fetch = jest.fn();
});

let wrapper;

beforeEach(() => {
    wrapper = shallow(<ProjectSearch />, { disableLifecycleMethods: true });
});
afterEach(() => {
    wrapper.unmount();
});

it("check if the component is loaded without crashing",
    (done) => {
        const spyDidMount = jest.spyOn(ProjectSearch.prototype, "componentDidMount");
        fetch.mockImplementation(() => {
            return Promise.resolve({
                status: 200,
                json: () => {
                    return Promise.resolve([{
                        projId: "P/1",
                        projectTitle: "Project test",
                        startDate: "2020-04-30",
                        endDate: "2020-05-03",
                        pmUsrId: "Usr/1",
                        pmUsrName: "Test User",
                        totalTaskCount: 3,
                        completedTaskCount: 1,
                        priority: 1

                    }]);
                }
            });
        });
        const didMount = wrapper.instance().componentDidMount();

        expect(spyDidMount).toHaveBeenCalled();
        done();
    })