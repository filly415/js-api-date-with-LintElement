import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyWidget extends LitElement {
    static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 250px;
      background-color: #e2fee2;
      padding: 16px;
      box-sizing: border-box;
      margin-top: 20px;
    }

    h1 {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }

    label {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
      display: block;
      margin-top: 10px;
      margin-right: 2px;
    }

    input[type="number"] {
      width: 100%;
      padding: 5px;
      font-size: 16px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    select {
      width: 35%;
      padding: 5px;
      font-size: 16px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    .row {
      display: flex;
    }

    .row select {
      flex: 1;
      margin-right: 10px;
    }

    p {
      margin: 8px 0;
    }
  `;

    static properties = {
      amount: {type: Number},
      from: {type: String},
      to: {type: String},
      rates: {type: Object}
    };

    constructor() {
      super();
      this.amount = 1;
      this.from = 'AUD';
      this.to = 'JPY'
      this.rates = {};
    }

    connectedCallback() {
      super.connectedCallback();
      this.fetchRates();
    }
    
    fetchRates() {
      fetch(`https://api.exchangerate.host/latest?base=${this.from}`)
      .then(response => response.json())
      .then(data => {
        this.rates = data.rates;
        this.requestUpdate();
      });
    }
    
    //handling changes made to input, to, and from.
    inputChange(x) {
      this.amount = x.target.value;
    }

    fromChange(x) {
      this.from = x.target.value;
      this.fetchRates();
    }

    toChange(x) {
      this.to = x.target.value;
    }

    render() {
      //rate conversion
      const rate = this.rates[this.to] / this.rates[this.from];
      const converted = this.amount * rate;

      return html`
        <h1>Currency Conversion</h1>
        <label for="amount">Amount:</label>
        <input type="number" id="amount" name="amount" .value=${this.amount} @input=${this.inputChange}>

        <div class="row">
          <label for="from">From:</label>
          <select id="from" name="from" @change=${this.fromChange}>
          ${Object.keys(this.rates).map(currency => html`
            <option value=${currency} ?selected=${currency === this.from}>${currency}</option>
          `)}
          </select>
          <label for="to">To:</label>
          <select id="to" name="to" @change=${this.toChange}>
            ${Object.keys(this.rates).map(currency => html `
          <option value=${currency} ?selected=${currency === this.to}>${currency}</option>
          `)}
          </select>
        </div>
        <p>Conversion: $${converted.toFixed(2)}</p>
      `;
    }
      
}

customElements.define('currency-converter', CurrencyWidget);