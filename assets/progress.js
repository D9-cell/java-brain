// Solved-problem tracking shared by the hub and every animation page
(function () {
  const STORE = 'jb-solved-v1', SYNCED = 'jb-synced-v1', PROFILES = 'jb-profiles-v1';

  // Reads one JSON value from browser storage
  function read(k, dflt) {
    try { return JSON.parse(localStorage.getItem(k)) || dflt; } catch (e) { return dflt; }
  }

  // Writes one JSON value to browser storage
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }

  const file = window.BrainSolved || {}, saved = read(SYNCED, {});
  const synced = { leetcode: [...new Set([...(file.leetcode || []), ...(saved.leetcode || [])])], gfg: [...new Set([...(file.gfg || []), ...(saved.gfg || [])])],
    codechef: file.codechef || [], updated: saved.updated || file.updated || null, profiles: { ...(file.profiles || {}), ...read(PROFILES, {}) } };
  const sets = { lc: new Set(synced.leetcode), gfg: new Set(synced.gfg), cc: new Set(synced.codechef) };
  const norm = t => String(t).toLowerCase().trim();

  // Reads the manual ticks from browser storage
  function load() { return read(STORE, {}); }

  // Writes the manual ticks back to browser storage
  function save(m) { write(STORE, m); }

  // Merges a solved list brought back by a sync bookmarklet; returns how many were new
  function importSynced(data) {
    const cur = read(SYNCED, {}), out = { ...cur, updated: new Date().toISOString().slice(0, 16).replace('T', ' ') };
    let added = 0;
    for (const k of ['leetcode', 'gfg']) if (data[k]) { const set = new Set(cur[k] || []); for (const x of data[k]) if (!set.has(x)) { set.add(x); added++; } out[k] = [...set]; }
    write(SYNCED, out);
    return added;
  }

  // Saves the visitor's usernames
  function saveProfiles(p) { write(PROFILES, p); }

  // Forgets everything this site stored in the browser
  function resetAll() { [STORE, SYNCED, PROFILES].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} }); }

  // Platform ids for a problem's links: lc:<slug>, gfg:<slug>, cc:<code>
  function ids(links) {
    const out = [];
    for (const [, u] of links || []) {
      let m = u.match(/leetcode\.com\/problems\/([^/?#]+)/);
      if (m) { out.push('lc:' + m[1]); continue; }
      m = u.match(/geeksforgeeks\.org\/problems\/([^/?#]+)/);
      if (m) { out.push('gfg:' + m[1]); continue; }
      m = u.match(/codechef\.com\/(?:problems|practice\/course\/[^/]+\/[^/]+\/problems)\/([^/?#]+)/);
      if (m) out.push('cc:' + m[1]);
    }
    return out;
  }

  // Stable key for one problem: its first platform id, else its title
  function key(title, links) {
    return ids(links)[0] || 'title:' + title;
  }

  // Whether a synced profile reports this problem as accepted (CodeChef is matched by name)
  function syncedSolved(title, links) {
    if (sets.cc.has(norm(title))) return true;
    return ids(links).some(id => { const [p, s] = id.split(':'); return !!sets[p] && sets[p].has(s); });
  }

  // Solved state: a manual tick wins, otherwise the synced profile decides
  function isSolved(title, links) {
    const m = load(), k = key(title, links);
    if (k in m) return m[k];
    return syncedSolved(title, links);
  }

  // Flips the manual tick for one problem and returns the new state
  function toggle(title, links) {
    const m = load(), k = key(title, links), now = !isSolved(title, links);
    if (now === syncedSolved(title, links)) delete m[k]; else m[k] = now;
    save(m);
    return now;
  }

  // Downloads ticks, synced lists and usernames as one JSON backup
  function exportTicks() {
    const blob = new Blob([JSON.stringify({ ticks: load(), synced: read(SYNCED, {}), profiles: read(PROFILES, {}) }, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'java-brain-solved.json';
    a.click();
  }

  // Restores a JSON backup (also accepts the older ticks-only format)
  function importTicks(text) {
    const d = JSON.parse(text);
    save(Object.assign(load(), d.ticks || (d.synced || d.profiles ? {} : d)));
    if (d.synced) importSynced(d.synced);
    if (d.profiles) saveProfiles({ ...read(PROFILES, {}), ...d.profiles });
  }

  window.BrainProgress = { isSolved, toggle, key, syncedSolved, exportTicks, importTicks, importSynced, saveProfiles, resetAll, synced };
})();
