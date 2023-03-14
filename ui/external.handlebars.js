import handlebars from 'https://cdn.skypack.dev/handlebars';

const getHtml = (data) => {
  const source = `
  <div style="margin-top: .5em; font-style: italic;">
    {{title}}
  </div>
  `;

  const template = handlebars.compile(source);
  return template(data);
}

window.fmExternal = window.fmExternal || {};

fmExternal.getCardHtml = async (filePath, data) => {
  return getHtml(data);
}