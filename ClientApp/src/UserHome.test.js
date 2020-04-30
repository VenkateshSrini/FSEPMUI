import React from 'react';
import ReactDOM from 'react-dom';
import UserHome from './components/user/userHome';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <UserHome/>
         , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});