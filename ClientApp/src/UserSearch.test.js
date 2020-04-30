import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import UserSearch from './components/user/UserSearch';
Enzyme.configure({ adapter: new Adapter() });
beforeAll(() => {
    global.fetch = jest.fn();
});

let wrapper;

beforeEach(() => {
    wrapper = shallow(<UserSearch />, { disableLifecycleMethods: true });
});

afterEach(() => {
    wrapper.unmount();
});
it("check if the component is loaded without crashing",
    (done) => {
        const spyDidMount = jest.spyOn(UserSearch.prototype, "componentDidMount");
        fetch.mockImplementation(() => {
            return Promise.resolve({
                status: 200,
                json: () => {
                    return Promise.resolve([{
                        id: "Usr/1",
                        firstName: "f1",
                        lastName: "l1",
                        employeeId: "EP001"
                    }]);
                }
            });
        });
        const didMount = wrapper.instance().componentDidMount();

        expect(spyDidMount).toHaveBeenCalled();
        done();
    })