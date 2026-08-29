"use server";

import prisma from "./prisma";

export async function createQuoteRequest(data: {
  name: string;
  phone: string;
  service: string;
  location: string;
  message?: string;
}) {
  try {
    const request = await prisma.quoteRequest.create({
      data: {
        name: data.name,
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
