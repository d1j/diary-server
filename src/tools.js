module.exports.contentCheck = (body, content) => {
  if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      if (typeof body[content[i]] === "undefined") {
        throw `Request body is missing: ${content[i]}`;
      }
    }
  } else if (typeof content === "string") {
    if (typeof body[content] === "undefined") {
      throw `Request body is missing: ${content}`;
    }
  }
};
