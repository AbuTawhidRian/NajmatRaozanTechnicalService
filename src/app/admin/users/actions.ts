"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

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
}

export async function deleteUser(id: string) {
  const session = await auth();
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const userToDelete = await prisma.user.findUnique({
    where: { id },
  });

  if (!userToDelete) {
    throw new Error("User not found");
  }

  if (userToDelete.email === session.user.email) {
    throw new Error("You cannot delete your own account");
  }

  // Prevent deleting the last admin
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

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!id || !name || !email) {
    throw new Error("Missing required fields");
  }

  // Check if email is taken by another user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser && existingUser.id !== id) {
    throw new Error("A user with this email already exists");
  }

  const data: any = {
    name,
    email,
  };

  if (password && password.length >= 6) {
    data.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/users");
}
