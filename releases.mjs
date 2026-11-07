export const releases = [
  { name: 'Simpler checkout', area: 'Commerce', owner: 'AL', status: 'Ready', description: 'A clearer checkout with fewer steps.', checks: 12 },
  { name: 'Account overview', area: 'Experience', owner: 'MK', status: 'In review', description: 'Everything customers need in one place.', checks: 8 },
  { name: 'Faster search', area: 'Platform', owner: 'JS', status: 'Ready', description: 'Find the right product, faster.', checks: 15 },
  { name: 'Order tracking', area: 'Commerce', owner: 'SP', status: 'In progress', description: 'Follow every order from start to finish.', checks: 6 },
];
export function selectReleases(items, query = '', status = 'All') {
  const term = query.trim().toLowerCase();
  return items.filter(item => (status === 'All' || item.status === status) && `${item.name} ${item.area}`.toLowerCase().includes(term));
}
export function summarize(items) {
  return { total: items.length, ready: items.filter(item => item.status === 'Ready').length, checks: items.reduce((sum, item) => sum + item.checks, 0) };
}
