import prisma from './prisma';

export type ServiceRow = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  order: number;
  isActive: boolean;
  gallery: string[];
};

/** Fetch all active services ordered for the public frontend */
export async function getActiveServices(limit?: number, latest?: boolean): Promise<ServiceRow[]> {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: latest ? { createdAt: 'desc' } : { order: 'asc' },
    ...(limit ? { take: limit } : {}),
  });
}

/** Fetch ALL services (including inactive) for the admin panel */
export async function getAllServices(): Promise<ServiceRow[]> {
  return prisma.service.findMany({
    orderBy: { order: 'asc' },
  });
}

/** Fetch a single service by its slug */
export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  return prisma.service.findUnique({
    where: { slug },
  });
}
