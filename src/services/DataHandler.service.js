const appConfig = require("../../config/app.configuration").fomart;

async function response(ctx, statusCode, statusText, data, debug, page) {
  if (appConfig == "api") {
    if (ctx && ctx.url) {
      ctx.statusCode = statusCode;
    }
    /*   if (data.content && data.pagination) {
      return {
        statusCode,
        statusText,
        data: data.content,
        pagination: data.pagination,
        debug,
        user: ctx.state.id,
      };
    } */
    return ctx.status(statusCode).json({ statusCode, statusText, data, debug });
  } else {
    ctx.render(page, data);
  }
}

function canContain(requestBody, canContain) {
  let updateObject = {};
  for (let i in canContain) {
    if (
      (requestBody[canContain[i]] ||
        requestBody[canContain[i]] === 0 ||
        requestBody[canContain[i]] === false) &&
      requestBody[canContain] !== null
    ) {
      updateObject[canContain[i]] = requestBody[canContain[i]];
    }
  }
  return updateObject;
}

function missingParameter(requestBody, requiredParam) {
  if (!requestBody) {
    return requiredParam[0];
  }
  for (let i in requiredParam) {
    if (
      !requestBody[requiredParam[i]] &&
      requestBody[requiredParam[i]] !== 0 &&
      requestBody[requiredParam[i]] !== false
    ) {
      return requiredParam[i];
    }
  }
}

module.exports = { missingParameter, response, canContain };
