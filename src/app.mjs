import { releases, selectReleases, summarize } from './releases.mjs';
const board = document.querySelector('#release-board');
const search = document.querySelector('#search');
const status = document.querySelector('#status');
function render() {
  const items = selectReleases(releases, search.value, status.value);
  board.replaceChildren(...items.map(item => {
    const card = document.createElement('article'); card.className = 'release-card';
    const tag = document.createElement('span'); tag.className = `status ${item.status.toLowerCase().replaceAll(' ', '-')}`; tag.textContent = item.status;
    const title = document.createElement('h3'); title.textContent = item.name;
    const description = document.createElement('p'); description.textContent = item.description;
    const meta = document.createElement('div'); meta.className = 'card-meta';
    const area = document.createElement('span'); area.textContent = item.area;
    const checks = document.createElement('span'); checks.textContent = `${item.checks} example checks`;
    const owner = document.createElement('span'); owner.className='avatar'; owner.textContent=item.owner;
    meta.append(area,checks,owner);card.append(tag,title,description,meta);return card;
  }));
  if (!items.length) { const empty = document.createElement('p');empty.textContent='No releases match your search.';board.append(empty); }
  document.querySelector('#result-count').textContent = `${items.length} releases`;
}
const summary=summarize(releases);
for (const [key,value] of Object.entries(summary)) document.querySelector(`[data-metric="${key}"]`).textContent=value;
search.addEventListener('input',render);status.addEventListener('change',render);render();
