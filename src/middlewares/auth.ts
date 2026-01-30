// import jwt from "jsonwebtoken";
// import type { JwtPayload } from "jsonwebtoken";
// import type { Request, Response, NextFunction } from "express";

// interface AuthPayload extends JwtPayload {
//     id: string;
// }

// const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorisation token required" });
//   }

//   const token: string =
//     typeof authorization === "string" ? authorization.split(" ")[1] || "" : "";

//   try {
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
//     next();
//   } catch (error: unknown) {
//     res.status(401).json({ error: error instanceof Error ? error.message : "Request not authorized" });
//   }
// };

// export default auth;
