import { prisma } from "@namaz/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0],
        userSettings: {
          create: {
            language: "en",
            notificationsEnabled: true
          }
        }
      },
      include: {
        userSettings: true
      }
    });

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}