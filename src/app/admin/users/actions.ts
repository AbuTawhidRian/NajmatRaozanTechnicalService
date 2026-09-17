"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  // Prevent deleting the last admin or yourself if we had the session here
  // For simplicity, we just delete the user
  const adminCount = await prisma.user.count({
    where: { role: "ADMIN" },
  });

  if (adminCount <= 1) {
    throw new Error("Cannot delete the last admin user");
  }

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
