import { Component } from "react"; 

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text } = this.props; 

        return (
            <button className="btn">{text}</button>
        );
    }
}

export default Button;