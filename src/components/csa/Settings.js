import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import stores from '../../server/config';
import CSAHeader from './CSAHeader';
import CSAFooter from './CSAFooter';
import { setConfig } from '../../actions/config';

let storeList = [];
const defaultSelect = { value : 0, label: "Select a store" };

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeOut: 2000,
      selectedOption: this.props.settings.selectedOption ? this.props.settings.selectedOption.value : defaultSelect,
      store: stores[0]
    };
  }
  componentDidMount() {
    {stores.map((store,index) => {
      storeList.push({ value: store.id, label: store.store_id });
    })}
  };
  onSelectChange = (selectedOption) => {
    this.setState({ selectedOption, "store" : stores[selectedOption.value]});
  }
  onSaveSettings = (selectedOption) => {
    this.props.setConfig(this.state);
  }
  render(){
    return( 
      <div>
        <CSAHeader />
        <div className="content--container">
          <div className="box-layout">
            <h1>Settings</h1>
            <h3>Store Location</h3>
            <Select
              name="option"
              value={this.state.selectedOption.value}
              onChange={this.onSelectChange}
              options={storeList}
            />

            <h3>Time out sessions</h3>


            <h3>Counters</h3>

            <button onClick={this.onSaveSettings}>Save</button>
          </div>
        </div>
        <CSAFooter />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  setConfig:(settings) => dispatch(setConfig(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);