import { success } from "../utils/api-gateway-result";
import { Request, Response } from "express";

export const checkHealth = (req: Request, res: Response) => {
  const result = success("OK");
  res.status(result.statusCode).json(JSON.parse(result.body));
};
