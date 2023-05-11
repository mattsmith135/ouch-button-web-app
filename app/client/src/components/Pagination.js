import { Component } from "react";
import { Link } from "react-router-dom"; 
import Button from './Button';

class Pagination extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <div className="pagination">
                <Link to="/"><Button /></Link>
                <Link to="/"><Button /></Link>
                <Link to="/"><Button /></Link>
            </div>
        )
    }
}

export default Pagination; 