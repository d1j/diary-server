module.exports.bodyCheck = (body, content) => {
  if (typeof body === "undefined") {
    throw "Undefined 'body'";
  }
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

module.exports.queryCheck = (query, content) => {
  if (Array.isArray(content)) {
    content.forEach((element) => {
      if (query[element] === "" || typeof query[element] === "undefined") {
        throw `Request query is missing: ${element}`;
      }
    });
  } else if (typeof content === "string") {
    if (query[content] === "" || typeof query[content] === "undefined") {
      throw `Request query is missing: ${content}`;
    }
  }
};
