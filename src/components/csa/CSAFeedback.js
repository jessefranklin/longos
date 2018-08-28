import React, { Component } from 'react';
import FontAwesomeIcon from 'react-fontawesome';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

class CSAFeedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback: ''
        }
    }
    onRating = (val) => {
        this.setState({ 'rating': val})
    }
    onFeedback = (e) => {
        const notes = e.target.value;
        this.setState({ feedback: notes });
    };
    onSubmit = () => {
        
    }
    render() {
        return (
            <div className="" >
                <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>CSA Feedback</Modal.Title>
                    </Modal.Header>
                    
                    <textarea
                        placeholder="Feedback is welcome"
                        onChange={this.onFeedback}
                        rows="4"
                        >
                    </textarea>
    
                    <button className="btn-submit" onClick={this.onSubmit}>
                        Submit
                    </button>
                </Modal>


            </div>
        )
    }
}

export default CSAFeedback;