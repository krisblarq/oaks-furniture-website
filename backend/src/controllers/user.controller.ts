import { Request, Response } from "express";
import Logging from "../library/Logging";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return user;
  } catch (e: any) {
    Logging.error(e);
    return res.status(409).send(e.message);
  }
}

// import { NextFunction, Request, Response } from "express";
// import mongoose from "mongoose";
// import User from "../models/user.model";

// const createUser = (req: Request, res: Response, next: NextFunction) => {
//   const { name, email, password } = req.body;

//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name,
//     email,
//     password,
//   });

//   return user
//     .save()
//     .then((user) => res.status(201).json({ user }))
//     .catch((error) => res.status(500).json({ error }));
// };

// const getUser = (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.params.userId;

//   return User.findById(userId)
//     .then((user) =>
//       user
//         ? res.status(200).json({ user })
//         : res.status(404).json({ message: "Not found" })
//     )
//     .catch((error) => res.status(500).json({ error }));
// };

// const getAllUser = (req: Request, res: Response, next: NextFunction) => {
//   return User.find()
//     .then((users) => res.status(200).json({ users }))
//     .catch((error) => res.status(500).json({ error }));
// };
// const updateUser = (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.params.userId;

//   return User.findById(userId)
//     .then((user) => {
//       if (user) {
//         user.set(req.body);

//         return user
//           .save()
//           .then((user) => res.status(201).json({ user }))
//           .catch((error) => res.status(500).json({ error }));
//       } else {
//         res.status(404).json({ message: "Not found" });
//       }
//     })
//     .catch((error) => res.status(500).json({ error }));
// };
// const deleteUser = (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.params.userId;

//   return User.findByIdAndDelete(userId)
//     .then((user) =>
//       user
//         ? res.status(201).json({ message: "Deleted" })
//         : res.status(404).json({ message: "Not found" })
//     )
//     .catch((error) => res.status(500).json({ error }));
// };

// export default { createUser, getUser, getAllUser, updateUser, deleteUser };
