import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/csa/auth';
import PinInput from 'react-pin-input';
import uuid from 'uuid/v1';

let pin;

class CSALogin extends React.Component {
    constructor(props) {
      super(props);
    }

    pins=(e)=>{
        if(e ==='8888'){
            this.props.login(e);
            this.props.history.push('/orderDashboard');
        }
    }
    render(){
        return(
            <div>
                <div className="csa--login content--container">
                    <div className="login--container">
                        <h2>Login</h2>
                        <PinInput
                            length={4}
                            focus
                            secret
                            ref={p => (pin = p)}
                            type="numeric"
                            onComplete={v => this.pins(v)}
                        />
                        <button onClick={() => pin.clear()} className="btn-primary">Clear</button>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (uid) => dispatch(login(uid))
});

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, mapDispatchToProps)(CSALogin);