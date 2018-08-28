import React, { Component } from 'react';
import FontAwesomeIcon from 'react-fontawesome';

class CustomerFeedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating: 2,
            feedback: ''
        }
        this.onRating = this.onRating.bind(this)
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
            <div className="feedback--customer" >
                <div>
                    <p>Please rate your experience:</p>
                    <button onClick={() => this.onRating}>
                        <FontAwesomeIcon
                            className='fa-frown'
                            name='fa-frown'
                            size='2x'
                            />
                    </button>

                    <button onClick={() => this.onRating}>
                        <FontAwesomeIcon
                            className='fa-meh'
                            name='fa-meh'
                            size='2x'
                            />
                    </button>

                    <button onClick={() => this.onRating}>
                        <FontAwesomeIcon
                            className='fa-smile'
                            name='fa-smile'
                            size='2x'
                            />
                    </button>
                </div>

                <div>
                    <p>Do you have any comments or suggestions?</p>
                    <textarea
                        placeholder="Feedback is welcome"
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

export default CustomerFeedback;