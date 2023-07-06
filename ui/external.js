import {
  enableDevelopmentMode,
  registerCardFooter,
  registerCardImage,
  registerCustomField,
  registerPanelView,
  registerCardTitle,
  registerCardDescription,
  registerCardTags,
  registerCardDate,
  registerCardStatus
} from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";
import {
  format
} from "https://cdn.jsdelivr.net/npm/date-fns@2.30.0/+esm"
import {
  css,
  html,
  LitElement
} from 'https://esm.run/lit';

// enableDevelopmentMode();

class CardTitle extends LitElement {
  static styles = css `
    .card__title {
      background: #FBE574;
      color: #0F131E;
      font-weight: 800;
      padding: 0.25rem 0.5rem;
    }
  `;

  static properties = {
    title: {
      type: String
    }
  };

  constructor() {
    super();

    this.title = undefined;
  }

  render() {
    return html `
      <div class="card__title">
        ${this.title}
      <div>
    `;
  }
}
customElements.define('card-title', CardTitle);

// registerCardTitle(async (filePath, data) => {
//   return `
//     <card-title title="${data.title}"></card-title>
//   `;
// });

// registerCardDescription(async (filePath, data) => {
//   return `
//     <p>Custom description</p>
//   `;
// });

// registerCardDate(async (filePath, data) => {
//   console.log(data["lastmod"])
//   if (data["lastmod"]) {
//     return `
//       <p>${format(new Date(data["lastmod"]), 'MM-dd')}</p>
//     `;
//   }
//   return ``;
// });

// registerCardStatus(async (filePath, data) => {
//   return `
//     <p>Custom status</p>
//   `;
// });

// registerCardTags(async (filePath, data) => {
//   return `
//     <p>Custom tags</p>
//   `;
// });



class CardImage extends LitElement {
  static styles = css `
    .card__image {
      background: #FBE574;
      color: #0F131E;
      font-weight: 800;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }

    .card__image__overlay { 
      background: rgba(0, 0, 0, 0.5);
      padding: 0.25rem 0.5rem;
      width: 100%;
    }
  `;

  static properties = {
    title: {
      type: String
    },
    src: {
      type: String
    }
  };

  constructor() {
    super();

    this.title = undefined;
    this.src = undefined;
  }

  render() {
    return html `
      <div class="card__image">
        <div class="card__image__overlay">${this.title}</div>
      <div>
    `;
  }
}
customElements.define('card-image', CardImage);

// registerCardImage(async (filePath, data) => {
//   return `
//     <card-image title="${data.title}" src="${data.fmPreviewImage}"></card-image>
//   `;
// });



class CardFooter extends LitElement {
  static styles = css `
    .card__footer {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }

    .card__footer a {
      height: 20px;
    }
  `;

  static properties = {
    slug: {
      type: String
    },
    commentTotal: {
      type: Number
    },
    commentUrl: {
      type: String
    }
  };

  getComments = async (crntSlug) => {
    const url = crntSlug.replace(/\//g, "");
    const apiUrl = `https://elio.dev/api/comments?slug=${url}%2F`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    if (!response.ok) return;

    const data = await response.json();
    if (data && data.count && data.url) {
      this.commentTotal = data.count;
      this.commentUrl = data.url;
    }
  }

  constructor() {
    super();

    this.slug = undefined;
    this.commentTotal = undefined;
    this.commentUrl = undefined;
  }

  render() {
    return html `
      <div class="card__footer">
        <img src="https://api.visitorbadge.io/api/combined?path=https%3a%2f%2fwww.eliostruyf.com${encodeURIComponent(this.slug).toLowerCase()}&readonly=true&labelColor=%230e131f&countColor=%23ffe45e&label=Views&style=flat-square" />

        ${
          this.commentTotal >= 0 ? html `
            <a href="${this.commentUrl}">
              <img src="https://img.shields.io/static/v1?label=comments&message=${this.commentTotal}&color=%23ffe45e&style=flat-square" />
            </a>
          ` : ''
        }
      <div>
    `;
  }

  firstUpdated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'slug') {
        this.getComments(this.slug);
      }
    });
  }
}
customElements.define('card-footer', CardFooter);

registerCardFooter(async (filePath, data) => {
  return `
    <card-footer slug="${data.slug}"></card-footer>
  `;
});

// registerCardFooter(async (filePath, data) => {
//   return `
//     <div style="background: #FBE574; color: #0F131E; text-align: center; padding: .5em">Your HTML for the card footer</div>
//   `;
// });


registerPanelView(async (data) => {
  return {
    title: "Custom View",
    content: `
      <div>
        <h1>Custom view...</h1>
        <p>Here you can add your own custom view.</p>
      </div>
    `
  }
});


let CustomFieldValueChange;

class CustomField extends LitElement {
  static styles = css `
    input {
      border: 1px solid transparent;
      box-sizing: border-box;
      font-family: var(--vscode-font-family);
      padding: var(--input-padding-vertical) var(--input-padding-horizontal);
      color: var(--vscode-input-foreground);
      outline: none;
      background-color: var(--vscode-input-background);
      width: 100%;
    }

    input:focus {
      border: 1px solid var(--vscode-inputValidation-infoBorder);
    }
  `;

  static properties = {
    inputValue: {
      type: String
    }
  };

  constructor() {
    super();
    this.inputValue = "";
  }

  _internalChange(e) {
    this.inputValue = e.target.value;
    CustomFieldValueChange(e.target.value);
  }

  render() {
    return html `
      <input type="text" value="${this.inputValue}" @change=${e => this._internalChange(e)} />
    `;
  }
}
customElements.define('custom-field', CustomField);

registerCustomField("customField", async (value, onChange) => {
  // Bind the event handler for the onChange evet
  CustomFieldValueChange = onChange;
  // Return the HTML of the custom field
  return `
    <custom-field inputValue="${value || ""}"></custom-field>
  `;
});

console.log('👩‍💻 - External script loaded - 👨‍💻');