import React, { Component } from 'react';
import CurrencyList from '../Currency_List/Currency_List.js';

class AppInput extends Component {
  //set default values
  id = "";
  type = "text";
  placeholder = "";
  defaultValue = "";
  isDataList = false;

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
      showDataList: false,
      dataList: props.dataList || []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleDataListSelected = this.handleDataListSelected.bind(this);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.id !== undefined && this.props.id !== this.id) {
      this.id = this.props.id;
    }
    if(this.props.type !== undefined && this.props.type !== this.type) {
      this.type = this.props.type;
    }
    if(this.props.placeholder !== undefined && this.props.placeholder !== this.placeholder) {
      this.placeholder = this.props.placeholder;
    }
    if(this.props.defaultValue !== undefined && this.props.defaultValue !== this.defaultValue) {
      this.defaultValue = this.props.defaultValue;
    }
    if(this.props.isDataList !== undefined && this.props.isDataList !== this.isDataList) {
      this.isDataList = this.props.isDataList;
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.defaultValue !== this.defaultValue) {
      this.setState({value: nextProps.defaultValue}); //update value based on latest defaultValue
    }
  }

  filterDataList(searchQuery) {
    var filteredDataList = [];
    if (this.isDataList) {
      this.props.dataList.forEach((data) => {
        if (data.indexOf(searchQuery.toUpperCase()) > -1) { //check if dataList contains any string based on search query
          filteredDataList.push(data);
        }
      })
    }
    return filteredDataList;
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      dataList: this.filterDataList(e.target.value)
    })
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.refs[this.id].value); //callback to parent
    }
  }

  handlePressEnter(e) {
    if((e.key === 'Enter' || e.charCode === 13) && typeof this.props.onPressEnter === 'function') {
      this.props.onPressEnter(this.refs[this.id].value);
      this.setState({value: ''}) //reset value on text field after pressed enter
    }
  }

  handleOnFocus(e) {
    if (this.isDataList) {
      this.setState({showDataList: true})
    }
  }

  handleDataListSelected(key) {
    this.setState({
      value: key
    }, () => {
      if (typeof this.props.onDataListSelected === 'function') {
        this.props.onDataListSelected(this.refs[this.id].value); //callback to parent
      }
    })
  }

  handleSubmitButtonClicked() {
    if (typeof this.props.onSubmitButtonClicked === 'function') {
      this.props.onSubmitButtonClicked(this.refs[this.id].value); //callback to parent
    }
  }

  getValue() {
    return this.refs[this.id].value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    //prevent unnecessary re-render
    return (
      this.state.dataList !== nextState.dataList ||
      this.state.value !== nextState.value ||
      this.state.showDataList !== nextState.showDataList
    )
  }

  render() {
    this.initRender();
    
    return (
      <div className="input-container">
        <div className="input-field-container ">
          <input
            id={this.id}
            className={"input-field-content col-12"}
            ref={this.id}
            type={this.type}
            placeholder={this.placeholder}
            onKeyPress={this.handlePressEnter}
            onChange={this.handleChange}
            onFocus={this.handleOnFocus}
            value={this.state.value}
          />
          <label htmlFor={this.id} className="input-label">{this.placeholder}</label>
          {this.isDataList && this.state.showDataList &&
            <CurrencyList
              dataList={this.state.dataList}
              onDataListSelected={this.handleDataListSelected}
            />
          }
        </div>
      </div>
    );
  }
}

export default AppInput;
