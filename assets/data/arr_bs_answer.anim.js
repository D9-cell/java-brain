const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
// Records a "smallest X that works" search: ok(x) returns [boolean, text]
const minSearch = (r, code, lo, hi, ok, lineOk, lineBad) => { while (lo < hi) { const mid = lo + Math.floor((hi - lo) / 2), [good, txt] = ok(mid); r.step(ln(code, good ? lineOk : lineBad), `try ${mid}: ${txt} → ${good ? 'works, search lower' : 'fails, search higher'}.`, [R('lo · mid · hi', [lo, mid, hi], { active: [1] })], { lo, mid, hi }); if (good) hi = mid; else lo = mid + 1; } return lo; };
const maxSearch = (r, code, lo, hi, ok, lineOk, lineBad) => { while (lo < hi) { const mid = lo + Math.floor((hi - lo + 1) / 2), [good, txt] = ok(mid); r.step(ln(code, good ? lineOk : lineBad), `try ${mid}: ${txt} → ${good ? 'works, search higher' : 'fails, search lower'}.`, [R('lo · mid · hi', [lo, mid, hi], { active: [1] })], { lo, mid, hi }); if (good) lo = mid; else hi = mid - 1; } return lo; };

const C_SH = `
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (daysNeeded(weights, mid) <= days) hi = mid;
    else lo = mid + 1;
}`;
{
  const w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5, r = recorder(), need = c => { let d = 1, l = 0; for (const x of w) { if (l + x > c) { d++; l = 0; } l += x; } return d; };
  r.step(0, 'Capacity lies in [max weight 10, total 55].', [A('weights', w)]);
  const ans = minSearch(r, C_SH, 10, 55, c => [need(c) <= days, `${need(c)} days`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `Smallest capacity <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Capacity To Ship Packages Within D Days'] = W('Binary search on capacity', C_SH, r.steps);
}

const C_KO = `
long hours = 0;
for (int p : piles) hours += (p + mid - 1) / mid;
if (hours <= h) hi = mid;
else lo = mid + 1;`;
{
  const piles = [3, 6, 7, 11], h = 8, r = recorder(), hrs = s => piles.reduce((t, p) => t + Math.ceil(p / s), 0);
  r.step(0, 'piles [3,6,7,11], h = 8. Speed lies in [1, 11].', [A('piles', piles)]);
  const ans = minSearch(r, C_KO, 1, 11, s => [hrs(s) <= h, `${piles.map(p => Math.ceil(p / s)).join('+')} = ${hrs(s)} hours`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `Minimum speed <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Koko Eating Bananas'] = W('Binary search on speed', C_KO, r.steps);
}

const C_SD = `
for (int x : nums) sum += (x + mid - 1) / mid;
if (sum <= threshold) hi = mid;
else lo = mid + 1;`;
{
  const nums = [1, 2, 5, 9], th = 6, r = recorder(), s = d => nums.reduce((t, x) => t + Math.ceil(x / d), 0);
  const ans = minSearch(r, C_SD, 1, 9, d => [s(d) <= th, `sum ${s(d)}`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `Smallest divisor <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Find the Smallest Divisor Given a Threshold'] = W('Binary search on divisor', C_SD, r.steps);
}

const C_BQ = `
run = d <= day ? run + 1 : 0;
if (run == k) {
    count++;
    run = 0;
}`;
{
  const bd = [7, 7, 7, 7, 12, 7, 7], m = 2, k = 3, r = recorder(), bq = day => { let c = 0, run = 0; for (const d of bd) { run = d <= day ? run + 1 : 0; if (run === k) { c++; run = 0; } } return c; };
  const ans = minSearch(r, C_BQ, 7, 12, d => [bq(d) >= m, `${bq(d)} bouquet${bq(d) === 1 ? '' : 's'}`], 'count++', 'run = 0;');
  r.step(0, `Day <b>${ans}</b>: all flowers bloom, runs give two bouquets of 3.`, [A('bloomDay', bd, { done: range(0, 6) })]);
  ANIM['Minimum Number of Days to Make m Bouquets'] = W('Binary search on day', C_BQ, r.steps);
}

const C_MS = `
if (hour <= dist.length - 1) return -1;
for (int i = 0; i < dist.length - 1; i++) t += (dist[i] + speed - 1) / speed;
return t + (double) dist[dist.length - 1] / speed;`;
{
  const dist = [1, 3, 2], hour = 2.7, r = recorder(), tm = s => dist.slice(0, -1).reduce((t, d) => t + Math.ceil(d / s), 0) + dist[2] / s;
  r.step(ln(C_MS, 'hour <= dist.length'), 'hour 2.7 > 2 rides of waiting, so it is possible.', [A('dist', dist)]);
  const ans = minSearch(r, C_MS, 1, 10, s => [tm(s) <= hour, `${tm(s).toFixed(2)} h`], 'return t +', 'return t +');
  r.step(0, `Minimum speed <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Minimum Speed to Arrive on Time'] = W('Binary search on speed', C_MS, r.steps);
}

const C_CT = `
for (int t : time) {
    trips += mid / t;
    if (trips >= totalTrips) break;
}
if (trips >= totalTrips) hi = mid;
else lo = mid + 1;`;
{
  const time = [1, 2, 3], total = 5, r = recorder(), tr = T => time.reduce((s, t) => s + Math.floor(T / t), 0);
  const ans = minSearch(r, C_CT, 1, 5, T => [tr(T) >= total, `${tr(T)} trips`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `At time <b>${ans}</b>: 3 + 1 + 1 = 5 trips.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Minimum Time to Complete Trips'] = W('Binary search on time', C_CT, r.steps);
}

const C_RC = `
for (int r : ranks) fixed += (long) Math.sqrt((double) mid / r);
if (fixed >= cars) hi = mid;
else lo = mid + 1;`;
{
  const ranks = [4, 2, 3, 1], cars = 10, r = recorder(), fx = T => ranks.reduce((s, k) => s + Math.floor(Math.sqrt(T / k)), 0);
  const ans = minSearch(r, C_RC, 1, 100, T => [fx(T) >= cars, `${ranks.map(k => Math.floor(Math.sqrt(T / k))).join('+')} = ${fx(T)} cars`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `Minimum time <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Minimum Time to Repair Cars'] = W('Binary search on time', C_RC, r.steps);
}

const C_BB = `
for (int x : nums) ops += (x - 1) / mid;
if (ops <= maxOperations) hi = mid;
else lo = mid + 1;`;
{
  const nums = [9], maxOps = 2, r = recorder();
  const ans = minSearch(r, C_BB, 1, 9, p => [Math.floor(8 / p) <= maxOps, `(9 − 1) / ${p} = ${Math.floor(8 / p)} splits`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `Penalty <b>${ans}</b>: 9 → 6 + 3 → 3 + 3 + 3.`, [R('bags', [3, 3, 3], { done: [0, 1, 2] })]);
  ANIM['Minimum Limit of Balls in a Bag'] = W('Binary search on penalty', C_BB, r.steps);
}

const C_CK = `
int mid = lo + (hi - lo + 1) / 2;
for (int c : candies) kids += c / mid;
if (kids >= k) lo = mid;
else hi = mid - 1;`;
{
  const c = [5, 8, 6], k = 3, r = recorder(), kd = x => c.reduce((s, v) => s + Math.floor(v / x), 0);
  const ans = maxSearch(r, C_CK, 0, 8, x => [kd(x) >= k, `${kd(x)} children served`], 'lo = mid', 'hi = mid - 1');
  r.step(0, `Each child gets <b>${ans}</b>.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Maximum Candies Allocated to K Children'] = W('Binary search on size', C_CK, r.steps);
}

const C_MM = `
for (int i = 0; i < nums.length; i++) {
    sum += nums[i];
    best = Math.max(best, (sum + i) / (i + 1));
}`;
{
  const a = [3, 7, 1, 6], r = recorder(); let s = 0, best = 0;
  a.forEach((v, i) => { s += v; best = Math.max(best, Math.ceil(s / (i + 1))); r.step(ln(C_MM, 'best = Math.max'), `Prefix [${a.slice(0, i + 1)}]: sum ${s} over ${i + 1} → at least ⌈${s}/${i + 1}⌉ = ${Math.ceil(s / (i + 1))}. best ${best}.`, [A('nums', a, { active: range(0, i) })], { sum: s, best }); });
  ANIM['Minimize Maximum of Array'] = W('Prefix averages', C_MM, r.steps);
}

const C_BV = `
int mid = lo + (hi - lo + 1) / 2;
if (side(mid, index) + side(mid, n - 1 - index) + mid <= maxSum) lo = mid;
else hi = mid - 1;`;
{
  const n = 6, idx = 1, ms = 10, r = recorder(), arr = v => range(0, n - 1).map(i => Math.max(1, v - Math.abs(i - idx))), sm = v => arr(v).reduce((a, b) => a + b, 0);
  const ans = maxSearch(r, C_BV, 1, ms, v => [sm(v) <= ms, `[${arr(v)}] sums to ${sm(v)}`], 'lo = mid', 'hi = mid - 1');
  r.step(0, `Peak <b>${ans}</b>: [${arr(ans)}].`, [A('array', arr(ans), { done: [idx] })]);
  ANIM['Maximum Value at a Given Index in a Bounded Array'] = W('Binary search on peak', C_BV, r.steps);
}

const C_RT = `
for (int b : batteries) usable += Math.min(b, mid);
if (usable >= (long) n * mid) lo = mid;
else hi = mid - 1;`;
{
  const n = 2, bat = [3, 3, 3], r = recorder(), us = T => bat.reduce((s, b) => s + Math.min(b, T), 0);
  const ans = maxSearch(r, C_RT, 0, 4, T => [us(T) >= n * T, `usable ${us(T)} vs needed ${n * T}`], 'lo = mid', 'hi = mid - 1');
  r.step(0, `Both computers run <b>${ans}</b> minutes by swapping the third battery around.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Maximum Running Time of N Computers'] = W('Binary search on time', C_RT, r.steps);
}

const C_MC = `
int mid = lo + (hi - lo) / 2;
if (total(nums, cost, mid) <= total(nums, cost, mid + 1)) hi = mid;
else lo = mid + 1;`;
{
  const nums = [1, 3, 5, 2], cost = [2, 3, 1, 14], r = recorder(), f = t => nums.reduce((s, x, i) => s + Math.abs(x - t) * cost[i], 0);
  r.step(0, `Cost by target: ${range(1, 5).map(t => `${t} → ${f(t)}`).join(', ')}. Convex: falls, then rises.`, [A('f(t), t = 1..5', range(1, 5).map(f))]);
  const ans = minSearch(r, C_MC, 1, 5, t => [f(t) <= f(t + 1), `f(${t}) = ${f(t)} vs f(${t + 1}) = ${f(t + 1)}`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `Target ${ans} → cost <b>${f(ans)}</b>.`, [R('answer', [f(ans)], { done: [0] })]);
  ANIM['Minimum Cost to Make Array Equal'] = W('Binary search on slope', C_MC, r.steps);
}

const C_MH = `
for (int t : workerTimes) {
    removed += units(mid / t);
    if (removed >= mountainHeight) break;
}
if (removed >= mountainHeight) hi = mid;
else lo = mid + 1;`;
{
  const h = 4, wt = [2, 1, 1], r = recorder(), u = b => { let x = 0; while ((x + 1) * (x + 2) / 2 <= b) x++; return x; }, rem = T => wt.reduce((s, t) => s + u(Math.floor(T / t)), 0);
  const ans = minSearch(r, C_MH, 1, 10, T => [rem(T) >= h, `${wt.map(t => u(Math.floor(T / t))).join('+')} = ${rem(T)} units`], 'hi = mid', 'lo = mid + 1');
  r.step(0, `<b>${ans}</b> seconds: the workers remove ${wt.map(t => u(Math.floor(ans / t))).join(' + ')} = ${rem(ans)} ≥ 4 units.`, [R('answer', [ans], { done: [0] })]);
  ANIM['Minimum Number of Seconds to Make Mountain Height Zero'] = W('Binary search on time', C_MH, r.steps);
}
