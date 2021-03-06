/*
937. Reorder Data in Log Files -- Easy
You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.


Example 1:

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]


Constraints:

0 <= logs.length <= 100
3 <= logs[i].length <= 100
logs[i] is guaranteed to have an identifier, and a word after the identifier.
*/
// Solution 1
// Time: O(A logA) - A is the total content of logs
// Space: O(A)
const reorderLogFiles = (logs) => {
  const nums = [];
  const dict = {};
  const letters = [];
  logs.forEach((log) => {
    const arr = log.split(' ');
    const id = arr[0];
    const firstChar = arr[1].charCodeAt(0);
    // Check if body is digits
    if (firstChar >= 48 && firstChar <= 57) { // digit
      nums.push(log);
    } else {
      const body = log.slice(id.length + 1);
      if (dict[body]) {
        dict[body].push(id);
      } else {
        dict[body] = [id];
      }
    }
  });
  // k - body, dict[k] - identifier
  Object.keys(dict).sort().forEach((k) => {
    dict[k].sort().forEach((str) => {
      letters.push(`${str} ${k}`);
    });
  });
  const res = letters.concat(nums);
  return res;
};


/* Solution 2: Use localeCompare method
The localeCompare method returns a number indicating whether str1 comes before, after or is the same as str2 in sort order.

Returns -1 if str1 is sorted before str2   -- 'ab'.localeCompare('cd')
Returns 0 if the two strings are equal     -- 'ab'.localeCompare('ab')
Returns 1 if str1 is sorted after str2   -- 'cd'.localeCompare('ab')
*/

const reorderLogFiles2 = (logs) => {
  const body = s => s.slice(s.indexOf(' ') + 1); // get the body after identifier
  const isNum = c => (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57);

  // if body is the same then compare identifier
  const compare = (a, b) => {
    const n = body(a).localeCompare(body(b)); // compare body first
    if (n !== 0) return n;
    return a.localeCompare(b);
  };

  const digitLogs = [];
  const letterLogs = [];
  for (const log of logs) {
    if (isNum(body(log))) digitLogs.push(log);
    else letterLogs.push(log);
  }

  return [...letterLogs.sort(compare), ...digitLogs];
};


console.log(reorderLogFiles(['a1 9 2 3 1', 'g1 act car', 'zo4 4 7', 'ab1 off key dog', 'a8 act zoo']));
