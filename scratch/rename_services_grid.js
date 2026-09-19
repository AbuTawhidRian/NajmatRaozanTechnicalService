
const fs = require('fs');
let content = fs.readFileSync('src/components/ServicesGrid.tsx', 'utf8');
content = content.replace(/getActiveServices/g, 'getActiveProjects');
content = content.replace(/@\/lib\/services/g, '@/lib/projects');
content = content.replace(/services: any\[\]/g, 'projects: any[]');
content = content.replace(/services = await/g, 'projects = await');
content = content.replace(/services during build/g, 'projects during build');
content = content.replace(/services\.map/g, 'projects.map');
content = content.replace(/\(service,/g, '(project,');
content = content.replace(/service\.id/g, 'project.id');
content = content.replace(/service\.title/g, 'project.title');
content = content.replace(/service\.description/g, 'project.description');
content = content.replace(/service\.imageUrl/g, 'project.imageUrl');
content = content.replace(/service\.slug/g, 'project.slug');
fs.writeFileSync('src/components/ServicesGrid.tsx', content);

