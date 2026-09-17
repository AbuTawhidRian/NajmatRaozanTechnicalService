"use server";

import prisma from "./prisma";
import { checkRateLimit } from "./rateLimit";

export async function createQuoteRequest(data: {
  name: string;
  email?: string;
  phone: string;
  service: string;
  location: string;
  message?: string;
}) {
  // Rate limit: max 5 submissions per minute per phone number.
  // Prevents form spam while allowing legitimate users.
  const { allowed } = checkRateLimit(`quote:${data.phone}`, 5, 60_000);
  if (!allowed) {
    return { success: false, error: "Too many submissions. Please wait a moment before trying again." };
  }

  try {
    let customer = null;
    
    const normalizedEmail = data.email?.trim().toLowerCase() || null;
    const normalizedPhone = data.phone.replace(/[\s-()]/g, '');

    // 1. Try to find by unique email first
    if (normalizedEmail) {
      customer = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    }

    // 2. If not found by email, try to find by phone
    if (!customer) {
      customer = await prisma.user.findFirst({
        where: { 
          // Search both raw and normalized phone just to be safe with existing data
          OR: [
            { phone: data.phone },
            { phone: normalizedPhone }
          ]
        },
      });
    }

    // 3. If still not found, create a new customer record
    if (!customer) {
      customer = await prisma.user.create({
        data: {
          name: data.name,
          email: normalizedEmail,
          phone: normalizedPhone,
          address: data.location,
          role: "CUSTOMER",
        },
      });
    }

    const request = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        service: data.service,
        location: data.location,
        message: data.message || null,
      },
    });
    return { success: true, request };
  } catch (error) {
    console.error("Failed to create quote request:", error);
    return { success: false, error: "Failed to submit request" };
  }
}
