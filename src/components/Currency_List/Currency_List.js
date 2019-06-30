import React, { Component } from 'react';

class CurrencyList extends Component {
  //set default values
  id = "";
  dataList = [];

  constructor(props) {
    super(props);
    this.handleDataListOptionClicked = this.handleDataListOptionClicked.bind(this);
  }

  initRender() { //change default values to passed props
    if(JSON.stringify(this.props.dataList) !== undefined && JSON.stringify(this.props.dataList) !== JSON.stringify(this.dataList)) {
      this.dataList = this.props.dataList;
    }
  }

  handleDataListOptionClicked(key) {
    if (typeof this.props.onDataListSelected === 'function') {
      this.props.onDataListSelected(key); //callback to parent
    }
  }

  render() {
    this.initRender();

    var renderDataList = () => {
      var dataListContent = [];
      var orderedDataList = this.dataList.sort(); //sort data by alphabetical order
      orderedDataList.forEach((key) => {
        //append to datalist
        dataListContent.push(
          <p key={key} className="currency-option" onClick={() => {this.handleDataListOptionClicked(key)}}>{key}</p>
        )
      })
      return dataListContent;
    }

    return (
      <div id={this.id} className="currency-container">
        {Object.keys(this.dataList).length > 0 ?
           renderDataList() : <span className="currency-option notfound"><i>Not Found</i></span>
         }
      </div>
    );
  }
}

export default CurrencyList;
