import { StatusCode } from "../model/types";

const DEFAULT_ERROR_MSG: string =
  "Hemos tenido un problema con su solicitud, por favor intentelo más tarde";

const headers = {
  "Content-Type": "application/json",
};

const apiGatewayResult = (code: StatusCode, body: unknown) => {
  return {
    statusCode: code,
    headers: headers,
    body:
      typeof body === "string"
        ? JSON.stringify({ message: body })
        : JSON.stringify(body),
  };
};

export const success = (body: unknown) => {
  return apiGatewayResult(200, body);
};
export const created = (body: unknown) => {
  return apiGatewayResult(201, body);
};
export const noContent = (msg?: string) => {
  return apiGatewayResult(204, msg);
};
export const unauthorized = (msg: string) => {
  return apiGatewayResult(401, msg);
};
export const restricted = (msg: unknown) => {
  return apiGatewayResult(403, msg);
};
export const notFound = (msg: string) => {
  return apiGatewayResult(404, msg);
};
export const error = (error: unknown = DEFAULT_ERROR_MSG) => {
  return apiGatewayResult(400, error);
};
export const badRequest = (error: unknown) => {
  return apiGatewayResult(400, error);
};
export const forbidden = (msg: string) => {
  return apiGatewayResult(403, msg);
};
