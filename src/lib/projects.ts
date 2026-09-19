import prisma from './prisma';

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  location: string | null;
  order: number;
  isActive: boolean;
  gallery: string[];
};

/** Fetch all active projects ordered for the public frontend */
export async function getActiveProjects(limit?: number, latest?: boolean): Promise<ProjectRow[]> {
  return prisma.project.findMany({
    where: { isActive: true },
    orderBy: latest ? { createdAt: 'desc' } : { order: 'asc' },
    ...(limit ? { take: limit } : {}),
  });
}

/** Fetch ALL projects (including inactive) for the admin panel */
export async function getAllProjects(): Promise<ProjectRow[]> {
  return prisma.project.findMany({
    orderBy: { order: 'asc' },
  });
}

/** Fetch a single project by its slug */
export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  return prisma.project.findUnique({
    where: { slug },
  });
}
