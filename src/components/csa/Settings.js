import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import CSAHeader from './CSAHeader';
import { setConfig } from '../../actions/config';
import { baseUrl, headers } from '../../const/global';

import axios from 'axios';

let storesObj =[];
let storeList = [];
const defaultSelect = { value : 0, label: "Select a store" };

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeOut: 60000,
      selectedObj: this.props.settings.selectedObj ? this.props.settings.selectedObj : 0,
      store: this.props.settings.store
    };
  }
  componentDidMount() {
    this.fetchStores();
  };
  fetchStores(){
    const url = `${baseUrl}/store`;
    axios.get(url, headers).then(
        (response) => {
          console.log(response.data);
          this.listStoreOptions(response.data);
        },
        (err) => {
            console.log(err);
        }
    )
  }
  listStoreOptions(stores){
    storesObj = stores;
    {stores.map((store,index) => {
      storeList.push({ value: index, label: store.name });
    })}
  }
  onSelectChange = (selectedOption) => {
    let v = selectedOption.value;
    let l = selectedOption.label;
    this.setState({ "selectedObj": { value: v, label:l }, "store" : storesObj[v]});
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
              value={this.state.selectedObj}
              onChange={this.onSelectChange}
              options={storeList}
            />

            <h3>Time out sessions</h3>


            <h3>Counters</h3>

            <button onClick={this.onSaveSettings}>Save</button>
          </div>
        </div>
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