import {
  registerCardFooter
} from "https://cdn.skypack.dev/@frontmatter/extensibility";

import {
  html,
  css,
  LitElement
} from 'https://cdn.skypack.dev/lit';

export class SimpleGreeting extends LitElement {
  static styles = css `p { color: #44FFD2 }`;

  static properties = {
    count: {
      type: Number
    },
  };

  constructor() {
    super();
    this.count = 0;
  }

  _increment(e) {
    this.count++;
  }

  render() {
    return html `
      <p><button @click="${this._increment}">Click Me!</button></p>
      <p>You've clicked me: ${this.count}!</p>
    `;
  }
}
customElements.define('simple-counter', SimpleGreeting);

registerCardFooter(async (filePath, data) => {
  const slug = encodeURIComponent(data.slug);
  return `
    <simple-counter></simple-counter>
  `;
});