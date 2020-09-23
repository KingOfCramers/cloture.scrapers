import morgan from "morgan";
import { logger } from "../winston";

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body).replace(/\\n/g, "");
});

// Send non-colorized to winston stream for writing (bypassing console)...
export const morganToWinston = morgan(
  (tokens, req, res) => {
    const isGqlQuery =
      req.baseUrl.startsWith(process.env.GRAPHQL_ENDPOINT) &&
      req.method === "POST";

    let body = [
      tokens.method(req, res),
      tokens["remote-addr"](req, res),
      tokens["remote-user"](req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ];

    if (isGqlQuery) {
      body.push(tokens["body"](req, res));
    }

    return body.join(" ");
  },
  {
    skip: function (req, res) {
      return (
        req.body.operationName === "IntrospectionQuery" &&
        process.env.NODE_ENV === "development"
      );
    },
    stream: logger.stream,
  }
);
