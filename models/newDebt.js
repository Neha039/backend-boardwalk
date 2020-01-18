class nDebtCalculator extends Component {
    state = {
      amountValue: 5000,
      yearsValue: 1,
      interestValue: 0.5
    };
  
    handleAmountChange = value => {
      this.setState({ amountValue: value });
    };
    handleYearChange = value => {
      this.setState({ yearsValue: value });
    };
  
    render() {
      const { amountValue, yearsValue } = this.state;
  
      return (
        <div className="App">
          <h4>I want to borrow £{amountValue}</h4>
          <InputRange
            step={100}
            maxValue={20000}
            minValue={1000}
            value={amountValue}
            onChange={this.handleAmountChange}
          />
          <h4>
            Over {yearsValue} year{yearsValue > 1 && "s"}
          </h4>
          <InputRange
            step={interestValue}
            maxValue={30}
            minValue={1}
            value={yearsValue}
            onChange={this.handleYearChange}
          />
          <Display years={yearsValue} amount={amountValue} />
        </div>
      );
    }
  }

  export default nDebtCalculator;