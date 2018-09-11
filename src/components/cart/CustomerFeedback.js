import React, { Component } from 'react';
import { connect } from "react-redux";
import FontAwesomeIcon from 'react-fontawesome';
import { dispatchFeedback } from '../../actions/feedback';

class CustomerFeedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            storeId: this.props.storeId,
            orderId: this.props.orderId,
            feedback: '',
            rating: null,
            maxRating: 4,
            profile: {
                email: this.props.profile.email,
                phone: this.props.profile.phone,
                username: this.props.profile.username,
                rewards: this.props.profile.rewards
            }

        }
        this.onRating = this.onRating.bind(this)
    }
    onRating = (val) => {
        this.setState({ 'rating': val});
    }
    onFeedback = (e) => {
        const notes = e.target.value;
        this.setState({ feedback: notes });
    };
    onSubmit = (e) => {
        
        this.props.dispatchFeedback(this.state).then(
            this.props.onSubmitted()
        );

        e.preventDefault();
    };

    render() {
        return (
            <div className="feedback--customer" >
                <div>
                    <p>Please rate your experience:</p>
                    <button onClick={() => this.onRating(1)} className={this.state.rating === 1 ? 'active' : ''}>
                        <FontAwesomeIcon
                            className='fa-frown'
                            name='fa-frown'
                            size='2x'
                            />
                    </button>

                    <button onClick={() => this.onRating(2)} className={this.state.rating === 2 ? 'active' : ''}>
                        <FontAwesomeIcon
                            className='fa-meh'
                            name='fa-meh'
                            size='2x'
                            />
                    </button>

                    <button onClick={() => this.onRating(3)} className={this.state.rating === 3 ? 'active' : ''}>
                        <FontAwesomeIcon
                            className='fa-smile'
                            name='fa-smile'
                            size='2x'
                            />
                    </button>
                    <button onClick={() => this.onRating(4)} className={this.state.rating === 4 ? 'active' : ''}>
                        <FontAwesomeIcon
                            className='fa-laugh'
                            name='fa-laugh'
                            size='2x'
                            />
                    </button>
                </div>
                <div>
                    <p>Do you have any comments or suggestions?</p>
                    <textarea
                        placeholder=""
                        onChange={this.onFeedback}
                        rows="4"
                        >
                    </textarea>
                </div>

                <button className="btn-submit" onClick={this.onSubmit}>
                    Submit
                </button>


            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchFeedback: (feedback) => dispatch(dispatchFeedback(feedback))
});
  
export default connect(undefined, mapDispatchToProps)(CustomerFeedback);
  

