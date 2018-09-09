import React, {Component} from 'react';

class EditClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.csaOrder.client.name,
            email: this.props.csaOrder.client.email,
            phoneNo: this.props.csaOrder.client.phoneNo !== null ? this.props.csaOrder.client.phoneNo : '',
            tyrNumber: this.props.csaOrder.client.tyrNumber !== null ? this.props.csaOrder.client.tyrNumber : ''
        }
    }
    updateClient = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };
    updateClientForm = () => {
        const payload = {
            id: this.props.csaOrder.id,
            storeId: this.props.csaOrder.store.id,
            client: {
                ...this.state
            },
            pickUpDate: this.props.csaOrder.pickupDate,
            pickUpTime: this.props.csaOrder.pickupTime
        }
        this.props.updateClientPickup('editClient',payload);
    }
    render(){
        return (
            <div>
                <input
                type="text"
                name="name"
                className='form-control'
                placeholder="First and Last Name"
                value={this.state.name}
                onChange={this.updateClient}
                />
                <input
                type="email"
                name="email"
                className='form-control'
                placeholder="email"
                value={this.state.email}
                onChange={this.updateClient}
                />
                <input
                type="phone"
                name="phoneNo"
                className='form-control'
                placeholder="phone"
                value={this.state.phoneNo}
                onChange={this.updateClient}
                />
                <input
                type="number"
                name="tyrNumber"
                className='form-control'
                value={this.state.tyrNumber}
                placeholder="rewards number"
                onChange={this.updateClient}
                />
                <div className="form--action-row">
                    <button className="order-detail--action" onClick={() => this.props.handleClose('editClient')}>Cancel</button>
                    <button className="order-detail--action btn-red" onClick={() => this.updateClientForm()}>Save</button>
                </div>
            </div>
        )
    }
}

export default EditClient;
  