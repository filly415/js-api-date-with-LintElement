import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

//don't import to portal for now, it crashes the site. This is just placeholder template

class TODO extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 250px;
      background-color: #e2fee2;
      padding: 16px;
      box-sizing: border-box;
    }
  `;

  render() {

  }
    
}

customElements.define('ADV-widget', TODO);