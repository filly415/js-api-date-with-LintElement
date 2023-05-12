import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetColumn extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
  :host {
    background-color: red;
  }
  `;

  constructor() {
    super();
    this.header = 'Widgets';
  }

  render() {
    return html`
      <div>
        <h2>Widgets</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn);