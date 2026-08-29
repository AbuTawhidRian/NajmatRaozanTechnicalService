"use server";

import prisma from "./prisma";

export async function createQuoteRequest(data: {
  name: string;
  email?: string;
  phone: string;
  service: string;
  location: string;
  message?: string;
}) {
  try {
    // Check if customer already exists by phone number
    let customer = await prisma.user.findFirst({
      where: { phone: data.phone, role: "CUSTOMER" },
    });

    // If not, create a new customer record
    if (!customer) {
      customer = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email || null,
          phone: data.phone,
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
