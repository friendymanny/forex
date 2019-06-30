import React, { Component } from 'react';
import ForexContent from './components/Forex_Content/Forex_Content.js';
import AppInput from './components/App_Input/App_Input.js';

import './App.css';

//Initial API call will be made with USD as base currency
const BASE_CURRENCY = 'USD';
const API_URL = 'https://api.exchangeratesapi.io/latest?base=' + BASE_CURRENCY;

//this can be configurable
const TIMEOUT = 60000;

class App extends Component {

  constructor() {
    super();
    this.state = {
      forexData: {},
      amountValue: 100
    }
    this.handleAmountValue = this.handleAmountValue.bind(this);
  }

  componentDidMount() {
    this.callExchangeRatesAPI();
  }

  callExchangeRatesAPI() {
    fetch(API_URL, {
      method: 'GET',
      timeout: TIMEOUT
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        this.setState({forexData: responseJson});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleAmountValue(value) {
    this.setState({amountValue: value})
  }

  shouldComponentUpdate(nextProps, nextState) {
    //prevent unnecessary re-render
    return (
      this.state.forexData !== nextProps.forexData ||
      this.state.amountValue !== nextState.amountValue
    )
  }

  render() {
    // console.log(process.env)
    return (
      <div className="app">
        <div className="app-container">
          <h2><center>ForEx App</center></h2>
          <div className="app-main-container col-12">
            <div className="app-amount-container">
              <AppInput
                id={"input-value"}
                type={"number"}
                placeholder={"Enter Amount"}
                onChange={this.handleAmountValue}
                defaultValue={this.state.amountValue}
              />
            </div>
            {this.state.forexData && Object.keys(this.state.forexData).length > 0 &&
              <div className="app-forex-container col-12">
                <ForexContent
                  baseCurrency={BASE_CURRENCY}
                  ratesData={this.state.forexData.rates}
                  amountValue={this.state.amountValue}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
