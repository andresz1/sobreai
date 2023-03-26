import status from "http-status";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

export type ApiRequest = NextApiRequest;

export type ApiReponse<T = any> = NextApiResponse<T>;

export const connect = () => {
  const router = createRouter<NextApiRequest, NextApiResponse>();

  router.handler({
    onError: (err, req, res) => {
      console.error(err);
      res.status(status.INTERNAL_SERVER_ERROR).end();
    },
    onNoMatch: (req, res) => {
      res.status(status.NOT_FOUND).end();
    },
  });

  return router;
};
