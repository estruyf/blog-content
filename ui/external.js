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
} from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility@0.0.11-beta.6466792/+esm";
import {
  format
} from "https://cdn.jsdelivr.net/npm/date-fns@2.30.0/+esm"
import {
  css,
  html,
  LitElement
} from 'https://esm.run/lit';
import {
  Task
} from 'https://esm.run/@lit/task';

// enableDevelopmentMode();

const getContributions = async () => {
  const response = await fetch("https://elio.dev/api/github-star", {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json; charset=utf-8"
    }
  });

  return await response.json();
}

const fetchContributions = async () => {
  if (!window.contributions) {
    window.contributions = getContributions();
  }
  return await window.contributions;
}

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
//   console.log(data)
//   // return `
//   //   <card-image title="${data.title}" src="${data.fmPreviewImage}"></card-image>
//   // `;

//   return `
//     <img src="${data.fmWebviewUrl}/screendown/twitter.png" />
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

  getDataTask = new Task(
    this,
    {
      task: async ([slug]) => {
        if (!this.slug) return;

        const contribution = await this.getContribution(slug);
        const comments = await this.getComments(slug);
        
        return {
          slug,
          contribution,
          comments
        }
      },
      args: () => [this.slug]
    }
  )

  getContribution = async (crntSlug) => {
    const contributions = await fetchContributions();

    if (!contributions?.data?.contributions) {
      return;
    }

    const blogs = contributions.data.contributions.filter(i => i.type === "BLOGPOST");
    const blog = (blogs || []).find(i => i.url === `https://www.eliostruyf.com${crntSlug.startsWith("/") ? crntSlug : `/${crntSlug}`}`);
    return blog;
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
      return {
        count: data.count,
        url: data.url
      }
    }

    return;
  }

  constructor() {
    super();

    this.slug = undefined;
    this.commentTotal = undefined;
    this.commentUrl = undefined;
    this.isOnGitHubStar = undefined;
  }

  render() {
    let slug = this.slug;
    if (!slug.startsWith("/")) {
      slug = `/${slug}`;
    }
    if (!slug.endsWith("/")) {
      slug = `${slug}/`;
    }
    slug = encodeURIComponent(slug).toLowerCase();

    return this.getDataTask.render({
      pending: () => html ``,
      complete: (data) => html `
        <div class="card__footer">
          ${
            data.contribution ? html `
              <span title="Published to GitHub Star profile"><svg data-v-54804d16="" width="21" height="20" viewBox="0 0 80 75" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#F6C247" d="M63.196 48.5l2.126 26.188-24.585-11.316-25.364 10.696 1.72-25.563L0 29.013l27.775-7.464L40.135 0l14.262 23.331L80 28.688 63.196 48.5"></path><path d="M60.097 48.955l1.657 20.42-15.109-6.954a1.755 1.755 0 01-1.022-1.61 995.1 995.1 0 00.036-6.576c0-1.89-.65-3.128-1.379-3.753 4.523-.503 9.268-2.216 9.268-10.004 0-2.212-.786-4.021-2.087-5.438.21-.513.906-2.574-.202-5.365 0 0-1.7-.545-5.575 2.078a19.514 19.514 0 00-5.08-.683 19.49 19.49 0 00-5.082.683c-3.877-2.623-5.58-2.078-5.58-2.078-1.106 2.79-.409 4.852-.2 5.365-1.298 1.417-2.09 3.226-2.09 5.438 0 7.77 4.738 9.507 9.246 10.02-.58.506-1.104 1.399-1.289 2.709-1.156.52-4.096 1.414-5.907-1.685 0 0-.717-1.643-2.754-1.787 0 0-1.982-.026-.14 1.232 0 0 1.314.754 1.9 2.126 0 0 1.19 3.942 6.837 2.718.006.981.014 3.32.02 5.113a1.756 1.756 0 01-1.075 1.624l-15.336 6.468 1.452-21.584-.973-1.11-13.54-15.443 22.64-6.085 1.43-.384L40.399 6.562l12.103 19.805 1.51.316 20.051 4.195-14.085 16.61.12 1.467" fill="#DE852E"></path></g></svg></span>
            ` : ''
          }
  
          <img src="https://api.visitorbadge.io/api/combined?path=https%3a%2f%2fwww.eliostruyf.com${data.slug}&readonly=true&labelColor=%230e131f&countColor=%23ffe45e&label=Page%20Views&style=flat-square" />
  
          ${
            (data?.comments?.count && data.comments.count >= 0) ? html `
              <a href="${data.comments.url}">
                <img src="https://img.shields.io/badge/${data.comments.count}-ffe45e?style=flat-square&label=comments&labelColor=0e131f
                " />
              </a>
            ` : ''
          }
        <div>
      `,
      error: (err) => html ``
    });
  }

  // firstUpdated(changedProperties) {
  //   changedProperties.forEach((oldValue, propName) => {
  //     if (propName === 'slug') {
  //       this.getAllContributions(this.slug);
  //       this.getComments(this.slug);
  //     }
  //   });
  // }
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

class GitHubActions extends LitElement {
  static styles = css ``;

  static properties = {
    name: {
      type: String
    },
    status: {
      type: Number
    },
    url: {
      type: String
    }
  };

  getDataTask = new Task(
    this,
    {
      task: async () => {
        const data = await this.getWorkflowStatus();
        
        return {
          name: data?.name, 
          status: data?.status, 
          url: data?.url
        }
      },
      args: () => []
    }
  )

  getWorkflowStatus = async () => {
    const response = await fetch("https://elio.dev/api/blog-workflow");
    if (!response.ok) return;

    const data = await response.json();
    if (data && data.name && data.status && data.url) {
      return {
        name: data.name,
        status: data.status,
        url: data.url
      }
    }

    return;
  };

  constructor() {
    super();

    this.name = undefined;
    this.status = undefined;
    this.url = undefined;
  }

  render() {
    return this.getDataTask.render({
      pending: () => html ``,
      complete: (data) => html `
        <a href="${data.url}">
          <img src="https://img.shields.io/badge/${data.status}-ffe45e?style=flat-square&label=${data.name}&labelColor=0e131f" />
        </a>
      `,
      error: (err) => html ``
    });
  }
}
customElements.define('github-actions', GitHubActions);

registerPanelView(async (data) => {  
  return {
    title: "GitHub Actions & page stats",
    content: `
      <div style="display: flex; flex-direction: column; gap: 1rem; justify-content: center; align-items: center;">
        <github-actions></github-actions>

        <img src="https://api.visitorbadge.io/api/combined?user=estruyf&repo=website&readonly=true&labelColor=%230e131f&countColor=%23ffe45e&label=Site%20Views&style=flat-square" />

        ${
          data?.slug ? `<card-footer slug="${data.slug}"></card-footer>` : ''
        }
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

registerCustomField("customField123", async (value, onChange) => {
  // Bind the event handler for the onChange evet
  CustomFieldValueChange = onChange;
  // Return the HTML of the custom field
  return `
    <custom-field inputValue="${value || ""}"></custom-field>
  `;
});

console.log('👩‍💻 - External script loaded - 👨‍💻');