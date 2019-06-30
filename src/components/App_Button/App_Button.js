import React, { Component } from 'react';



class AppButton extends Component {
  //set default values
  text = "";
  isButtonDelete = false;

  initRender() { //change default values to passed props
    if(this.props.text !== undefined && this.props.text !== this.text) {
      this.text = this.props.text;
    }
    if(this.props.isButtonDelete !== undefined && this.props.isButtonDelete !== this.isButtonDelete) {
      this.isButtonDelete = this.props.isButtonDelete;
    }
  }

  handleButtonClicked() {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(); //callback to parent
    }
  }

  render() {
    this.initRender();

    var circleButtonStyle = {};
    if (this.isButtonDelete) {
      circleButtonStyle = {
        borderRadius: '50%',
        lineHeight: '0.5',
        fontSize: '16px',
        fontWeight: '200'
      }
    }

    return (
      <div className="button-container">
        <button className="button-content" onClick={() => {this.handleButtonClicked()}} style={circleButtonStyle}>{this.text}</button>
      </div>
    );
  }
}

export default AppButton;
