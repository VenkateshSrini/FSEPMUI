import React, { Component } from 'react'; 
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap'; 
class AppHeader extends Component { 
    //state = { // 4
    //    isOpen: false
    //};
    //toggle = this.toggle.bind(this); 
    //toggle() { // 6
    //    this.setState({
    //        isOpen: !this.state.isOpen
    //    })
    //}
    render() { 
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                <p style={{color: "white"}}> Project Management</p>
            </NavbarBrand>
        </Navbar>;
    }
}
export default AppHeader; 