import { Component } from "react";

class MainPage extends Component {
    constructor(props) {
        super(props); 
    }
    
    render() {
        return (
            <div className="main">
                <div className="main-container">
                    <p className="labels">User</p>
                    <h1>Adam Baker</h1>
                    <div className="content-container">
                        <div className="flexed">
                            <div className="">
                                <p className="labels">First Name</p>
                                <p>Adam</p>
                            </div>
                            <div>
                                <p className="labels">Last Name</p>
                                <p>Baker</p>
                            </div>
                        </div>
                        <div className="flexed">
                            <div>
                                <p className="labels">Email Address</p>
                                <p>Adam@gmail.com</p>
                            </div>
                            <div>
                                <p className="labels">Phone</p>
                                <p>+61 452 103 520</p>
                            </div>
                        </div>
                        <div className="flexed">
                            <div>
                                <p className="labels">Date registered with ouch button</p>
                                <p>05/03/2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <p className="labels">How many times has the button been pressed in the last 24 hours</p>
                    </div>
                    <p>Adam's ouch button has been pressed a total of 70 times over the last week</p>
                </div>
            </div>
        )
    }
}

export default MainPage;