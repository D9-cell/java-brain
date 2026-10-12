const W = (name, code, steps) => [{ name, code, steps }];
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const MP = (name, m) => R(name, Object.entries(m).map(([k, v]) => `${k}:${v}`));

const C_SK = `
for (int x : nums) {
    prefix += x;
    count += seen.getOrDefault(prefix - k, 0);
    seen.merge(prefix, 1, Integer::sum);
}`;
{
  const a = [1, 2, 3, -2, 2], k = 3, r = recorder(), seen = { 0: 1 }; let pre = 0, count = 0;
  r.step(0, 'k = 3. seen starts with the empty prefix {0: 1}.', [A('nums', a), MP('seen', seen)], { prefix: 0, count });
  a.forEach((x, i) => { pre += x; const add = seen[pre - k] || 0; count += add; seen[pre] = (seen[pre] || 0) + 1; r.step(ln(C_SK, 'count +='), `prefix ${pre}: earlier prefixes equal to ${pre - k}: ${add}. count ${count}.`, [A('nums', a, { active: [i] }), MP('seen', seen)], { prefix: pre, count }); });
  ANIM['Subarray Sum Equals K (O(n))'] = W('Prefix + HashMap', C_SK, r.steps);
}

const C_DK = `
prefix = ((prefix + x) % k + k) % k;
total += count[prefix];
count[prefix]++;`;
{
  const a = [4, 5, 0, -2, -3, 1], k = 5, r = recorder(), cnt = [1, 0, 0, 0, 0]; let pre = 0, total = 0;
  a.forEach((x, i) => { pre = ((pre + x) % k + k) % k; total += cnt[pre]; cnt[pre]++; r.step(ln(C_DK, 'total +='), `+${x}: remainder ${pre}, matches ${cnt[pre] - 1} earlier prefix${cnt[pre] - 1 === 1 ? '' : 'es'}. total ${total}.`, [A('nums', a, { active: [i] }), A('count by remainder', cnt.slice(), { active: [pre] })], { remainder: pre, total }); });
  ANIM['Subarray Sums Divisible by K'] = W('Remainder counts', C_DK, r.steps);
}

const C_LD = `
prefix = ((prefix + arr[i]) % k + k) % k;
if (first.containsKey(prefix)) best = Math.max(best, i - first.get(prefix));
else first.put(prefix, i);`;
{
  const a = [2, 7, 6, 1, 4, 5], k = 3, r = recorder(), first = { 0: -1 }; let pre = 0, best = 0;
  a.forEach((x, i) => { pre = ((pre + x) % k + k) % k; const seen = pre in first; if (seen) best = Math.max(best, i - first[pre]); else first[pre] = i; r.step(ln(C_LD, seen ? 'best = Math.max' : 'first.put'), `i = ${i}: remainder ${pre} ${seen ? `first seen at ${first[pre]} → length ${i - first[pre]}` : 'is new, remember index ' + i}. best ${best}.`, [A('arr', a, seen ? { done: range(first[pre] + 1, i) } : { active: [i] }), MP('first', first)], { best }); });
  ANIM['Longest subarray with sum divisible by K'] = W('First index per remainder', C_LD, r.steps);
}

const C_ML = `
prefix += nums[i];
Integer j = first.get(prefix - k);
if (j != null) best = Math.max(best, i - j);
first.putIfAbsent(prefix, i);`;
{
  const a = [1, -1, 5, -2, 3], k = 3, r = recorder(), first = { 0: -1 }; let pre = 0, best = 0;
  a.forEach((x, i) => { pre += x; const j = first[pre - k]; if (j !== undefined) best = Math.max(best, i - j); if (!(pre in first)) first[pre] = i; r.step(ln(C_ML, j !== undefined ? 'best = Math.max' : 'putIfAbsent'), `prefix ${pre}: ${j !== undefined ? `prefix ${pre - k} first at ${j} → length ${i - j}` : `no prefix ${pre - k} yet`}. best ${best}.`, [A('nums', a, j !== undefined ? { done: range(j + 1, i) } : { active: [i] }), MP('first', first)], { best }); });
  ANIM['Maximum Size Subarray Sum Equals k'] = W('First index per prefix', C_ML, r.steps);
}

const C_CA = `
balance += nums[i] == 1 ? 1 : -1;
if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));
else first.put(balance, i);`;
{
  const a = [0, 1, 1, 0, 1, 1, 0, 0], r = recorder(), first = { 0: -1 }; let b = 0, best = 0;
  a.forEach((x, i) => { b += x ? 1 : -1; const seen = b in first; if (seen) best = Math.max(best, i - first[b]); else first[b] = i; r.step(ln(C_CA, seen ? 'best = Math.max' : 'first.put'), `balance ${b}${seen ? `, first at ${first[b]} → equal 0s and 1s over length ${i - first[b]}` : ' (new)'}. best ${best}.`, [A('nums', a, seen ? { done: range(first[b] + 1, i) } : { active: [i] })], { balance: b, best }); });
  ANIM['Contiguous Array'] = W('Balance + first index', C_CA, r.steps);
}

const C_CS = `
prefix = (prefix + nums[i]) % k;
Integer j = first.get(prefix);
if (j == null) first.put(prefix, i);
else if (i - j >= 2) return true;`;
{
  const a = [23, 2, 4, 6, 7], k = 6, r = recorder(), first = { 0: -1 }; let pre = 0;
  for (let i = 0; i < a.length; i++) { pre = (pre + a[i]) % k; const j = first[pre]; if (j === undefined) { first[pre] = i; r.step(ln(C_CS, 'first.put'), `i = ${i}: remainder ${pre} is new.`, [A('nums', a, { active: [i] }), MP('first', first)]); } else if (i - j >= 2) { r.step(ln(C_CS, 'return true'), `i = ${i}: remainder ${pre} first at ${j}, gap ${i - j} ≥ 2 → [${a.slice(j + 1, i + 1)}] sums to a multiple of 6 → <b>true</b>.`, [A('nums', a, { done: range(j + 1, i) })]); break; } }
  ANIM['Continuous Subarray Sum'] = W('First index per remainder', C_CS, r.steps);
}

const C_NS = `
odd += x % 2;
if (odd >= k) count += seen[odd - k];
seen[odd]++;`;
{
  const a = [1, 1, 2, 1, 1], k = 3, r = recorder(), seen = [1, 0, 0, 0, 0, 0]; let odd = 0, count = 0;
  a.forEach((x, i) => { odd += x % 2; if (odd >= k) count += seen[odd - k]; seen[odd]++; r.step(ln(C_NS, 'count +='), `${x} → ${odd} odd so far${odd >= k ? `; prefixes with ${odd - k} odd: ${seen[odd - k]}` : ''}. count ${count}.`, [A('nums', a.map(v => v % 2), { active: [i] }), A('seen', seen.slice())], { odd, count }); });
  ANIM['Count Number of Nice Subarrays'] = W('Prefix count array', C_NS, r.steps);
}

const C_IS = `
if (x % modulo == k) cnt = (cnt + 1) % modulo;
total += seen.getOrDefault(((cnt - k) % modulo + modulo) % modulo, 0);
seen.merge(cnt, 1, Integer::sum);`;
{
  const a = [3, 2, 4], mod = 2, k = 1, r = recorder(), seen = { 0: 1 }; let cnt = 0, total = 0;
  r.step(0, 'modulo 2, k = 1: flag elements with x % 2 == 1 → [1, 0, 0].', [A('flags', a.map(x => x % mod === k ? 1 : 0))]);
  a.forEach((x, i) => { if (x % mod === k) cnt = (cnt + 1) % mod; const key = ((cnt - k) % mod + mod) % mod, add = seen[key] || 0; total += add; seen[cnt] = (seen[cnt] || 0) + 1; r.step(ln(C_IS, 'total +='), `cnt mod 2 = ${cnt}; need earlier ${key}: ${add}. total ${total}.`, [A('nums', a, { active: [i] }), MP('seen', seen)], { cnt, total }); });
  ANIM['Count of Interesting Subarrays'] = W('Prefix remainders', C_IS, r.steps);
}

const C_DP = `
prefix = (prefix + nums[i]) % p;
Integer j = last.get(((prefix - need) % p + p) % p);
if (j != null) best = Math.min(best, i - j);
last.put(prefix, i);`;
{
  const a = [3, 1, 4, 2], p = 6, need = 4, r = recorder(), last = { 0: -1 }; let pre = 0, best = 4;
  r.step(0, 'Total 10 ≡ 4 (mod 6): remove the shortest subarray with sum ≡ 4.', [A('nums', a)], { need });
  a.forEach((x, i) => { pre = (pre + x) % p; const key = ((pre - need) % p + p) % p, j = last[key]; if (j !== undefined) best = Math.min(best, i - j); last[pre] = i; r.step(ln(C_DP, j !== undefined ? 'best = Math.min' : 'last.put'), `prefix ${pre}: ${j !== undefined ? `remainder ${key} last at ${j} → remove length ${i - j}` : `no remainder ${key} yet`}.`, [A('nums', a, j !== undefined ? { bad: range(j + 1, i) } : { active: [i] }), MP('last', last)], { best }); });
  r.step(0, `Answer <b>${best}</b>: remove [4].`, [R('answer', [best], { done: [0] })]);
  ANIM['Make Sum Divisible by P'] = W('Last index per remainder', C_DP, r.steps);
}

const C_LK = `
prefix += nums[i];
int cls = (i + 1) % k;
best = Math.max(best, prefix - minPrefix[cls]);
minPrefix[cls] = Math.min(minPrefix[cls], prefix);`;
{
  const a = [-5, 1, 2, -3, 4], k = 2, r = recorder(), minP = [0, Infinity]; let pre = 0, best = -Infinity;
  a.forEach((x, i) => { pre += x; const cls = (i + 1) % k; best = Math.max(best, pre - minP[cls]); minP[cls] = Math.min(minP[cls], pre); r.step(ln(C_LK, 'best = Math.max'), `prefix ${pre} at length ${i + 1} (class ${cls}): best ${best === -Infinity ? '−∞' : best}.`, [A('nums', a, { active: [i] }), A('min prefix per class', minP.map(v => v === Infinity ? '∞' : v))], { best: best === -Infinity ? '−∞' : best }); });
  r.step(0, `Answer <b>${best}</b>: [1, 2, −3, 4].`, [R('answer', [best], { done: [0] })]);
  ANIM['Maximum Subarray Sum With Length Divisible by K'] = W('Min prefix per class', C_LK, r.steps);
}

const C_AB = `
prefix += x;
max = Math.max(max, prefix);
min = Math.min(min, prefix);`;
{
  const a = [2, -5, 1, -4, 3, -2], r = recorder(); let pre = 0, mx = 0, mn = 0; const ps = [0];
  a.forEach((x, i) => { pre += x; ps.push(pre); mx = Math.max(mx, pre); mn = Math.min(mn, pre); r.step(ln(C_AB, 'min = Math.min'), `prefix ${pre}: max ${mx}, min ${mn}.`, [A('prefixes', ps.slice(), { active: [ps.length - 1] })], { max: mx, min: mn }); });
  r.step(0, `Answer ${mx} − (${mn}) = <b>${mx - mn}</b>: subarray [−5, 1, −4].`, [R('answer', [mx - mn], { done: [0] })]);
  ANIM['Maximum Absolute Sum of Any Subarray'] = W('Prefix extremes', C_AB, r.steps);
}

const C_MJ = `
if (x == target) {
    below += freq[prefix + offset];
    prefix++;
} else {
    prefix--;
    below -= freq[prefix + offset];
}
total += below;
freq[prefix + offset]++;`;
{
  const a = [1, 2, 2, 3], tg = 2, r = recorder(), freq = { 0: 1 }; let pre = 0, below = 0, total = 0;
  r.step(0, 'target 2 → +1, others −1. Count earlier prefixes strictly below the current one.', [A('signs', a.map(x => x === tg ? '+1' : '−1'))], { prefix: 0, below: 0, total: 0 });
  a.forEach((x, i) => { if (x === tg) { below += freq[pre] || 0; pre++; } else { pre--; below -= freq[pre] || 0; } total += below; freq[pre] = (freq[pre] || 0) + 1; r.step(ln(C_MJ, x === tg ? 'below += freq' : 'below -= freq'), `${x === tg ? '+1' : '−1'} → prefix ${pre}, ${below} earlier prefix${below === 1 ? '' : 'es'} below it → ${below} majority subarrays end here. total ${total}.`, [A('nums', a, { active: [i] }), MP('freq', freq)], { prefix: pre, below, total }); });
  ANIM['Count Subarrays With Majority Element I & II'] = W('Balance + running count', C_MJ, r.steps);
}
