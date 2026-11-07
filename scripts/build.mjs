import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
const environment=process.env.DEPLOY_ENV || 'Local';
const revision=(process.env.SOURCE_SHA || 'local').slice(0,7);
if (!/^[A-Za-z0-9 -]+$/.test(environment) || !/^[A-Za-z0-9]+$/.test(revision)) throw new Error('Invalid build metadata');
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('src','dist',{recursive:true});
let html=await readFile('dist/index.html','utf8');html=html.replaceAll('__ENVIRONMENT__',environment).replaceAll('__REVISION__',revision);await writeFile('dist/index.html',html);
await writeFile('dist/deployment.json',JSON.stringify({environment,revision,sha:process.env.SOURCE_SHA||'local'},null,2)+'\n');
await writeFile('dist/.nojekyll','');console.log(`Built ${environment} at ${revision}`);
