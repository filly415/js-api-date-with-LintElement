import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/weatherForecast.js';
import './components/currencyConversion.js';
import './components/mathFact.js';
import './components/dateFact.js';
class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: red;
    }

    main {
      display: flex;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
  }

  render() {
    return html`
      <header>
        <h1 >${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>
        <widget-column header="Left">
          <weather-widget></weather-widget>
          <currency-converter></currency-converter>
          <math-fact header="mathFact Widget"></math-fact>
          <date-fact header="dateFact Widget"></date-fact>
          <widget-block header="Forth Widget"></widget-block>
          <ad-widget></ad-widget>
        </widget-column>
        <blog-block></blog-block>       

      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);