import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    if (!user) return null;

    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existingUser) return existingUser;

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: fullName || "Unnamed User",
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error checking/creating user:", error.message);
    return null;
  }
};
