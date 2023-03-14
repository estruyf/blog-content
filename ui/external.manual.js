fmExternal = window.fmExternal || {};

fmExternal.getCardFooter = function (filePath, data) {
  console.log('getCardHtml', filePath, data)
  if (data && data.slug && !data.draft) {
    return `<div style="margin-top:0.5rem"><img src="https://api.visitorbadge.io/api/combined?path=https%3a%2f%2fwww.eliostruyf.com${encodeURIComponent(data.slug).replace(/%2F/g, '%2f')}&readonly=true&labelColor=%231E222C&countColor=%23108D94&style=flat-square&label=Views" /></div>`
  }
  return '';
}