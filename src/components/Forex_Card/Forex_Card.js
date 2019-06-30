import React, { Component } from 'react';
import AppButton from '../App_Button/App_Button.js';

import CurrencyData from '../../data/CurrencyData.json';

class CommonCard extends Component {
  //set default values
  cardData = [];

  initRender() { //change default values to passed props
    if(this.props.cardData !== undefined && this.props.cardData !== this.cardData) {
      this.cardData = this.props.cardData;
    }
    if(this.props.baseCurrency !== undefined && this.props.baseCurrency !== this.baseCurrency) {
      this.baseCurrency = this.props.baseCurrency;
    }
  }

  handleButtonClicked(index) {
    if (typeof this.props.onRemoveButtonClicked === 'function') {
      this.props.onRemoveButtonClicked(index); //callback to parent
    }
  }
 
  render() {
    this.initRender();

    var renderCards = () => {
      return this.cardData.map((data, index) => {
        return (
          <div key={data.currency + '_' + index} className="card-container">
            <div className="card-body">
              <div className="card-title">
                <p className="card-title left">{data.currency}</p>
                <p className="card-title right">{data.value}</p>
              </div>
              <div className="card-text">
                <p><b><i>{data.currency} - {CurrencyData[data.currency]}</i></b></p>
                <p>1 {this.baseCurrency} = {data.currency} {data.rate}</p>
              </div>
            </div>
            <div className="card-button-container">
              <AppButton
                text={"X"}
                isButtonCircle={true}
                onClick={() => {this.handleButtonClicked(index)}}
              />
            </div>
          </div>
        )
      })
    }
    return (
      <div>
        {this.cardData && this.cardData.length > 0 && renderCards()}
      </div>
    );
  }
}

export default CommonCard;
