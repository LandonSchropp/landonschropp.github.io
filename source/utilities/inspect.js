module.exports = function inspect(object) {
  return `<pre>${ JSON.stringify(object, null, 2) }</pre>`;
};
