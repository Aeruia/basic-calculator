import React from 'react';
import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      formula: '0',
      currentNumber: '',
      prevOperator: '',
    }
  }

  componentDidMount() {
    const numbers = Array.from(document.querySelectorAll('.number'));
    numbers.forEach(number => number.addEventListener('click', this.handleNumbers));
    const operators = Array.from(document.querySelectorAll('.operator'));
    operators.forEach(operator => operator.addEventListener('click', this.handleOperators));
  }

  handleNumbers = (e) => {
    const number = parseInt(e.target.innerHTML);
    if (this.state.formula === '0' & number === 0) {
      return;
    }
    if (this.state.formula === '0') {
      this.setState({ formula: number.toString(), currentNumber: this.state.currentNumber.concat(number) });
      return
    }
    this.setState({ formula: this.state.formula.concat(number), currentNumber: this.state.currentNumber.concat(number) })
  }

  handleDecimal = (e) => {
    if (this.state.currentNumber.indexOf('.') === -1) {
      this.setState({ formula: this.state.formula.concat('.'), currentNumber: this.state.currentNumber.concat('.') });
    }
  }

  handleOperators = (e) => {
    const operator = e.target.innerHTML;
    if (operator === '-' && ['/', '+', '-', 'x'].includes(this.state.formula.slice(-1))) {
      this.setState({ currentNumber: '-', formula: this.state.formula.concat(operator) });
      return;
    }
    const total = this.calculate(this.state.prevOperator)
    this.setState({ formula: this.state.formula.concat(operator), prevOperator: operator, total: total, currentNumber: '' });
  }

  handleEqual = (e) => {
    const total = this.calculate(this.state.prevOperator);
    let answer = total.toFixed(4).toString();
    while (answer.slice(-1) === '0') {
      answer = answer.slice(0, -1);
    }
    if (answer.slice(-1) === '.') {
      answer = answer.slice(0, -1);
    }

    this.setState({ formula: answer, prevOperator: '', currentNumber: total.toString(), total: total })
  }

  calculate = (operator) => {
    if (operator === '' && this.state.currentNumber !== '') {
      return parseFloat(this.state.currentNumber);
    }

    if (this.state.currentNumber === '-') {
      this.setState.currentNumber = '';
      return this.state.total;
    }
    if (this.state.currentNumber === '') {
      return this.state.total;
    }
    switch (operator) {
      case '/':
        return this.state.total / parseFloat(this.state.currentNumber);
      case 'x':
        return this.state.total * parseFloat(this.state.currentNumber);
      case '-':
        return this.state.total - parseFloat(this.state.currentNumber);
      default:
        return this.state.total + parseFloat(this.state.currentNumber);
    }
  }
  initialize = (e) => {
    this.setState({
      total: 0,
      formula: '0',
      currentNumber: '',
      prevOperator: '',
    })
  }
  render() {
    console.log(this.state);

    return (
      <div className="App">
        <div className="calculator">
          <div id="display">{this.state.formula}</div>
          <button id="clear" onClick={this.initialize}>AC</button>
          <button id="divide" className="operator">/</button>
          <button id="multiply" className="operator">x</button>
          <button id="seven" className="number">7</button>
          <button id="eight" className="number">8</button>
          <button id="nine" className="number">9</button>
          <button id="subtract" className="operator">-</button>
          <button id="four" className="number">4</button>
          <button id="five" className="number">5</button>
          <button id="six" className="number">6</button>
          <button id="add" className="operator">+</button>
          <button id="one" className="number">1</button>
          <button id="two" className="number">2</button>
          <button id="three" className="number">3</button>
          <button id="equals" onClick={this.handleEqual}>=</button>
          <button id="zero" className="number">0</button>
          <button id="decimal" className="decimal" onClick={this.handleDecimal}>.</button>
        </div>
      </div>
    );
  }
}
