---
title: A code-driven approach to theme your VS Code webview
slug: /code-driven-approach-theme-vscode-webview/
author: Elio Struyf
type: post
date: 2022-01-31T17:03:36.203Z
lastmod: 2022-01-31T17:03:36.812Z
draft: false
tags:
  - Styling
  - Theme
  - Theming
  - VSCode
  - Extensions
categories: []
comments: true
keywords:
  - code-driven
  - theme
description: In this article, Elio shows a code-driven approach to theme your Visual Studio Code extension webviews.
preview: /social/b89e29fd-ca3e-43bc-b95f-1256e5aa7bad.png
---

When it comes to theming the webview's content of your Visual Studio Code extensions, the proposed way by the Visual Studio Code team is to use the provided CSS variables from the current theme. Although, in some cases, you want a bit more control, or make sure it matches what you want to achieve. That is why a code-driven approach is sometimes required.

Let us first focus on the proposed way to theme the webview's content of your VS Code extension.

If you open the webview its developer tools in VS code, you can spot all these CSS variables in the `style` attribute of the `HTML` element.

![CSS Variables passed on the HTML element](/uploads/2022/vscode-theming-variables.png)

Webviews can access all the theme colors. 

{{< blockquote type="info" text="You can find an overview of all the color references in the [VS Code theme color documentation](https://code.visualstudio.com/api/references/theme-color)." >}}

The notation of these variables is as follows; all use the `--vscode-` prefix, followed by the variable name. The dot (`.`) gets replaced by a dash (`-`).

**Examples**:

```css
--vscode-font-weight: normal;
--vscode-font-size: 13px;
--vscode-editor-font-family: &quot;Cascadia Code&quot;;
--vscode-editor-font-weight: normal;
--vscode-editor-font-size: 15px;
--vscode-foreground: #f3eff5;
...
```

{{< blockquote type="info" text="Here is a list of all the VS Code theme variables: [theme variables - gist](https://gist.github.com/estruyf/ba49203e1a7d6868e9320a4ea480c27a#file-vscode-theme-variables-css)" >}}

In your extension CSS file, you can use these variables as follows:

```css
.body {
	background-color: var(--vscode-editor-background);
	color: var(--vscode-editor-foreground);
}
```

## Cool, but what with CSS in JS, theme providers, ...?

The default CSS way to theme/style is good enough in many cases, but when using component libraries like [MUI](https://mui.com/), you might want a code-driven to create your themes.

Another advantage of using a code-driven approach is that you can manipulate some theme values, like converting HEX to RGBA to define the alpha value for backgrounds and more.

### Getting all CSS variables and their values

As mentioned above, all the CSS variables get defined on the HTML style element. To retrieve these from code, all you need to do is get the value of the style attribute.

One way is to get the values one by one as follows:

```typescript
const styles = getComputedStyle(document.querySelector('html'));
const editorBackground = styles.getPropertyValue('--vscode-editor-background')
```

The above approach might be good if you only need to get a couple of values; the next one might be better if you need more CSS variables or want them all.

```typescript
const htmlStyle = document.querySelector('html')?.getAttribute('style');
if (!htmlStyle) {
  return;
}

// Retrieve only the VS Code css variables
const codeStyles = htmlStyle.split(';').map(x => x.trim()).filter(s => s.startsWith('--vscode-')).reduce((obj, current) => ({ ...obj, ...toStyleObject(current)}), {});

// Convert the style string to an object of name/value pairs
const toStyleObject = (str: string) => {
  const data = str.split(':');
  let property = data[0];
  const value = data[1];

  property = property.replace('--vscode-', '').split('-').map((valuePart, idx) => {
    if (idx === 0) {
      return valuePart;
    }

    return `${valuePart.charAt(0).toUpperCase()}${valuePart.slice(1)}`;
  }).join('');

  return {
    [property]: value
  };
};
```

The above code will give you key/value (property/value) pairs and allows you to make use of them in your code. To do so, you can use `codeStyles.editorBackground` and get the color value.

### Theme changes

Wait! What about theme changes? Good question, as when you use the CSS approach, it will all be automatic. 

When using the code-driven approach, you will have to observe theme changes. You can use an observer to check the `class` and `attributes` on the document body as each time you change the theme, the following attributes change:

- **class**: `vscode-light`, `vscode-dark`, or `vscode-high-contrast`
- **data-vscode-theme-kind**: same as class
- **data-vscode-theme-name**: the name of the theme

An example of the observer looks as follows:

```typescript
const mutationObserver = new MutationObserver((mutationsList, observer) => {
  updateCssVariables();
});

updateCssVariables();

mutationObserver.observe(document.body, { childList: false, attributes: true })
```

{{< blockquote type="info" text="In the `updateCssVariables` method, you can define the same logic from above." >}}

*Happy theming your extensions*