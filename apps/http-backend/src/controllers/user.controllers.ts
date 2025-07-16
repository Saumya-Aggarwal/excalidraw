import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db/client";
export const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
      // Check if user already exists
    const user = prisma.user.find({ email: email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Create new user
    const newUser = prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = (req: Request, res: Response) => {
  //get the user from the request body after the zod validation
  const user = {
    userId: "12345", // this should be replaced with actual user ID from the database
    email: "s@gmail.com",
    name: "S",
  };

  //password checking logic

  //generate JWT token
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET ? process.env.JWT_SECRET : "qwerty"
  );

  res.json({
    message: "User logged in successfully",
    success: true,
    token: token,
    user: user,
  });
};
