
const fs = require('fs');

function replaceFile(path, replacements) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    replacements.forEach(([search, replace]) => {
        content = content.split(search).join(replace);
    });
    fs.writeFileSync(path, content);
}

replaceFile('src/app/(main)/projects/[slug]/page.tsx', [
    ['const service = await getProjectBySlug(slug);', 'const project = await getProjectBySlug(slug);'],
    ['if (!service)', 'if (!project)'],
    ['const [service, settings]', 'const [project, settings]']
]);

replaceFile('src/app/admin/projects/[id]/edit/page.tsx', [
    ['const service = await prisma.project.findUnique', 'const project = await prisma.project.findUnique'],
    ['if (!service)', 'if (!project)'],
    ['const oldService', 'const oldProject'],
    ['oldService.', 'oldProject.'],
    ['oldService)', 'oldProject)'],
    ['async function updateService', 'async function updateProject'],
    ['action={updateService}', 'action={updateProject}']
]);

replaceFile('src/app/admin/projects/page.tsx', [
    ['const service = await prisma.project.findUnique', 'const project = await prisma.project.findUnique']
]);

replaceFile('src/app/admin/settings/page.tsx', [
    ['../services/SubmitButton', '../projects/SubmitButton']
]);

replaceFile('prisma/seed.ts', [
    ['prisma.service', 'prisma.project']
]);

console.log('Fixed undefined variables!');

