import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: 0
    };
  }
  selOptions= (stores) => {
    let storeList = [];
    {stores.map((store,index) => {
      storeList.push({ value: index, label: store.store });
    })}
    
    return storeList;
  }
  onSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  render(){
    const stores = this.props.settings;
    const options = this.selOptions(stores);
 
    return(
      <div>
        <div className="box-layout">
          <h1>Settings</h1>
          <Select
            name="option"
            value={this.state.selectedOption}
            onChange={this.onSelectChange}
            options={options}
            searchable={false}
            clearable={false} 
          />
          <button>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Settings);