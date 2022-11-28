const sanitizeHTML = str => str.replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, c => `&#${c.charCodeAt(0)};`);

export default sanitizeHTML;
