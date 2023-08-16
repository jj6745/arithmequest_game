// Solve.js

export default function solve(n1, n2, end) {
  const nums = [n1, n2];
  const res = new Set();

  function backtrack(state, used, acc) {
    if (used.length === 2) {
      if (acc === end) {
        res.add(state);
      }
      return;
    }
    if (state === '') {
      for (const val of nums) {
        backtrack(String(val), [val], val);
      }
      return;
    }

    for (const v of nums) {
      if (used.includes(v)) {
        continue;
      }
      backtrack(state + '+' + String(v), [...used, v], acc + v);
      backtrack(state + '-' + String(v), [...used, v], acc - v);
      if (acc % v === 0) {
        backtrack(state + '/' + String(v), [...used, v], acc / v);
      }
    }
  }

  backtrack('', [], 0);
  return res;
}
