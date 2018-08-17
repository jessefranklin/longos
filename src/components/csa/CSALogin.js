import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/csa/auth';
import CSAHeader from './CSAHeader';

export const CSALogin = ({ startLogin }) => (
    <div>
        <div className="content--container">
            <h1>Login</h1>
            <button onClick={startLogin}>Login</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(CSALogin);