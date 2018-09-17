import React, { Component } from 'react';
import { connect } from "react-redux";
import FontAwesomeIcon from 'react-fontawesome';
import { Button, Modal, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { dispatchReport } from '../../actions/feedback';

class CSAFeedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            storeId: 'store24',
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
        this.props.dispatchReport(this.state).then(
            console.log('thank you')
        );
    }
    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.handleClose} className="modal--feedback">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <h3>CSA Feedback</h3>
                    <textarea
                        placeholder="Feedback is welcome"
                        onChange={this.onFeedback}
                        rows="4"
                        className="feedback--csa"
                        >
                    </textarea>

                    <Modal.Footer>
                        <button className="btn-primary btn-green btn-center" onClick={this.onSubmit}>
                            Submit
                        </button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchReport: (feedback) => dispatch(dispatchReport(feedback))
});
  
export default connect(undefined, mapDispatchToProps)(CSAFeedback);