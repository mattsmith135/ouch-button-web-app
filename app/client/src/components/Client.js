import { Component } from "react";
import Button from './Button';

class Client extends Component {
    constructor(props) {
        super(props); 
    }
    
    render() {
        return (
            <div className="client">
                <div className="client-wrapper">
                    <div className="client-header">
                        <p className="client-header__subheading">User</p>
                        <h1 className="client-header__heading">Adam Baker</h1>
                    </div>
                    <div className="client-content">
                        <div className="client-information">
                            <div className="client-information-header">
                                <h3 className="client-information-header__heading">Personal Information</h3>
                                <Button text="Edit"/>
                            </div>
                            <div className="client-information-content">
                                <div className="client-information-content-row">
                                    <div className="client-information-field">
                                        <p className="client-information-field__label">First Name</p>
                                        <p className="client-information-field__entry">Adam</p>
                                    </div>
                                    <div className="client-information-field">
                                        <p className="client-information-field__label">Last Name</p>
                                        <p className="client-information-field__entry">Baker</p>
                                    </div>
                                </div>
                                <div className="client-information-content-row">
                                    <div className="client-information-field">
                                        <p className="client-information-field__label">Email</p>
                                        <p className="client-information-field__entry">adambaker@gmail.com</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Client;