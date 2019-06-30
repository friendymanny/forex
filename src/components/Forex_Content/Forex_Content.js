import React, { Component } from 'react';
import ForexCard from '../Forex_Card/Forex_Card.js';
import CommonButton from '../App_Button/App_Button.js';
import CommonInput from '../App_Input/App_Input.js';

class ForexContent extends Component {
  //set default values
  forexData = [];
  baseCurrency = "";
  ratesData = {};
  ratesDataKey = [];
  amountValue = 0;

  constructor() {
    super();
    this.state = {
      isAddButtonClicked: false,
      currency: '',
      forexData: []
    }

    this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    this.handleInputCurrency = this.handleInputCurrency.bind(this);
    this.handleRemoveButtonClicked = this.handleRemoveButtonClicked.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.baseCurrency !== undefined && this.props.baseCurrency !== this.baseCurrency) {
      this.baseCurrency = this.props.baseCurrency;
    }
    if(JSON.stringify(this.props.ratesData) !== undefined && JSON.stringify(this.props.ratesData) !== JSON.stringify(this.ratesData)) {
      this.ratesData = this.props.ratesData;
    }
    if(this.props.amountValue !== undefined && this.props.amountValue !== this.amountValue) {
      this.amountValue = this.props.amountValue;
    }
  }

  handleAddButtonClicked() {
    this.setState({isAddButtonClicked: true})
    if (this.ratesDataKey.length === 0) {
      Object.keys(this.ratesData).forEach((rates) => {
        this.ratesDataKey.push(rates); //set rate keys only
      })
    }
  }

  handleInputCurrency(value) {
    if (value || this.refs.inputcurrency.getValue()) {
      this.setState({
        currency: value || this.refs.inputcurrency.getValue(),
        isAddButtonClicked: false
      }, () => {
        this.calculateForex(this.ratesData, this.amountValue)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.amountValue !== this.amountValue) {
      this.calculateForex(this.ratesData, nextProps.amountValue) //update amount value
    }
  }

  calculateForex(ratesData, amountValue) {
    var currency = this.state.currency.toUpperCase(); //convert what user typed to uppercase (e.g. "idr" -> "IDR")
    var rate = ratesData[currency]; //rate for a currency (e.g. 14891)

    if (rate !== undefined) {
      var result = amountValue * rate;
      result = !isNaN(result) ? result : 0; //show calculated result as 0 if the result is not a number

      //check if current currency exist
      var indexOfCurrency = this.forexData.findIndex(forex => forex.currency === currency);
      var isCurrencyExist = indexOfCurrency > -1 ? true : false;

      this.forexData.forEach((data) => {
        data.value = data.rate * amountValue; //update all calculated amount whenever the input amount changes
      })
      if (!isCurrencyExist) { //add currency if it doesnt exist
        this.forexData.push({
          currency: currency, //e.g. IDR
          rate: ratesData[currency], //e.g. 14891
          value: result
        })
      }
    }
    this.setState({forexData: this.forexData})
  }

  handleRemoveButtonClicked(index) {
    this.forexData.splice(index, 1); //remove data based on index
    this.setState({forexData: this.forexData})
  }

  render() {
    this.initRender();

    return (
      <div className="forex-container col-12">
        <div className="forex-header col-12">
          <i className="forex-content col-12"><b style={{fontSize: '12px'}}>{this.baseCurrency} - United States Dollars</b></i>
          <div className="forex-content left col-4">{this.baseCurrency}</div>
          <div className="forex-content right col-8">{this.amountValue}</div>
        </div>
        <hr/>
        <div className="forex-body col-12">
          {this.state.forexData && this.state.forexData.length > 0 &&
            <div className="forex-card-container">
              <ForexCard
                key={Math.random()}
                cardData={this.state.forexData}
                baseCurrency={this.baseCurrency}
                onRemoveButtonClicked={this.handleRemoveButtonClicked}
              />
            </div>
          }
          {!this.state.isAddButtonClicked &&
            <div className="forex-button-container">
              <CommonButton
                text={"Add More Currencies"}
                onClick={this.handleAddButtonClicked}
              />
            </div>
          }
          {this.state.isAddButtonClicked &&
            <div>
              <div className="forex-input-container col-8">
                <CommonInput
                  id={"inputcurrency"}
                  ref={"inputcurrency"}
                  type={"text"}
                  placeholder={"Enter Currency"}
                  isDataList={true}
                  dataList={this.ratesDataKey}
                  onDataListSelected={this.handleInputCurrency}
                  onPressEnter={this.handleInputCurrency}
                />
              </div>
              <div className="forex-submit-container col-4">
                <CommonButton
                  text={"Submit"}
                  onClick={this.handleInputCurrency}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ForexContent;
