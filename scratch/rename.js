
const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src/app/admin/projects').concat([
    'src/components/ProjectGallery.tsx',
    'src/app/sitemap.ts',
    'src/app/(main)/projects/[slug]/page.tsx'
]);

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/getAllServices/g, 'getAllProjects');
    content = content.replace(/getActiveServices/g, 'getActiveProjects');
    content = content.replace(/getServiceBySlug/g, 'getProjectBySlug');
    content = content.replace(/prisma\.service/g, 'prisma.project');
    content = content.replace(/\/admin\/services/g, '/admin/projects');
    content = content.replace(/@\/lib\/services/g, '@/lib/projects');
    
    // Some manual replacements
    if (f.includes('page.tsx') || f.includes('Form.tsx')) {
        content = content.replace(/const services = /g, 'const projects = ');
        content = content.replace(/services\.length/g, 'projects.length');
        content = content.replace(/services\[/g, 'projects[');
        content = content.replace(/services\.findIndex/g, 'projects.findIndex');
        content = content.replace(/services\.map/g, 'projects.map');
        content = content.replace(/service\.id/g, 'project.id');
        content = content.replace(/service\.title/g, 'project.title');
        content = content.replace(/service\.isActive/g, 'project.isActive');
        content = content.replace(/service\.order/g, 'project.order');
        content = content.replace(/service\.slug/g, 'project.slug');
        content = content.replace(/service\.gallery/g, 'project.gallery');
        content = content.replace(/service\.imageUrl/g, 'project.imageUrl');
        content = content.replace(/service\.location/g, 'project.location');
        content = content.replace(/service\.description/g, 'project.description');
        content = content.replace(/\(service\)/g, '(project)');
        content = content.replace(/\(service,/g, '(project,');
        content = content.replace(/service: /g, 'project: ');
        content = content.replace(/ServiceAdminPage/g, 'ProjectAdminPage');
        content = content.replace(/ServicesAdminPage/g, 'ProjectsAdminPage');
        content = content.replace(/EditServicePage/g, 'EditProjectPage');
    }
    
    fs.writeFileSync(f, content);
});
console.log('Done!');

