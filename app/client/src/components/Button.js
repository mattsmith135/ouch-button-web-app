import { Component } from "react"; 

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text } = this.props; 

        return (
            <button class="btn">{text}</button>
        );
    }
}

export default Button;