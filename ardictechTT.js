// 1. Büyük Ünlü Uyumu (Find if palatal harmony in the word.)
// I believe we are looking for the best case algorithm for Palatal Harmony
// This one is O(n) in worst case.
// If we are gonna feed with an dictionary (words array) it will give an other O(n)
// which will result to O(n^2)
function determinePalatalHarmony(word) {
  let boldVowelCount = 0; // [aouı]
  let thinVowelsCount = 0; // [eiöü]

  for (let i = 0; i < word.length; i++) {
    if (
      word[i] === "a" ||
      word[i] === "o" ||
      word[i] === "u" ||
      word[i] === "ı"
    ) {
      boldVowelCount++;
    }

    if (
      word[i] === "e" ||
      word[i] === "i" ||
      word[i] === "ö" ||
      word[i] === "ü"
    ) {
      thinVowelsCount++;
    }

    if (boldVowelCount && thinVowelsCount) return false;
  }

  return true;
}

// 2. Pazar Günlerini Bulma (Find the sundays that is the 1st day of month)
// When I don't use the Date object I couldn't find a better way than this
// The algorithm is O(n^3) although the 3rd n is only 5 elements at most. 
function findSundays() {
  const sundays = [];

  const WEEK_DAYS = 7;
  const REGULAR_DAYS_IN_YEAR = {
    '1': 31,
    '2': 28,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31,
  };

  const EACH_FOURTH_YEAR = {
    '1': 31,
    '2': 29,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31,
  }

  let year = 1900;
  // this is because 7.1.1900 is sunday
  let sundayDate = 7;

  while (year <= 2000) {
    for (const key in REGULAR_DAYS_IN_YEAR) {
      if (year % 4 === 0 && year !== 1900) {
        // februaries are 29 days
        while (sundayDate < EACH_FOURTH_YEAR[key]) {
          sundayDate += WEEK_DAYS;
        }

        sundayDate -= EACH_FOURTH_YEAR[key];
      } else {
        // februaries are 28 days
        while (sundayDate < REGULAR_DAYS_IN_YEAR[key]) {
          sundayDate += WEEK_DAYS;
        }

        sundayDate -= REGULAR_DAYS_IN_YEAR[key];
      }
      
      // +key + 1 is to get the correct month 
      // since I subtract the days of month before I increase the month
      // it is same for the year on 12th month
      if (sundayDate === 1 && +key < 12) {
        sundays.push(`1/${+key + 1}/${year}`);
      } else if (sundayDate === 1 && +key === 12) {
        sundays.push(`1/1/${year + 1}`);
      }
    }
    
    year++;
  }

  return sundays;
}

console.log(findSundays());

// 3. İkil Ağaçta Anomali Tespiti
// (Find if there is an anomaly like there are 2 links directing to same node
// in a binary tree algorithm)
function findBinaryTreeAnomaly(tree) {
  // I assumed the tree is like a json file
  // tree = [
  //   {number: 4, left: 2, right: 7},
  //   {number: 7, left: 6, right: 11},
  //   {number: 6, left: 5},
  // ]
  // I solved the question according to this assumption. Tree looks sth like the above.
  const leftLinks = [];
  const rightLinks = [];

  tree.forEach((node) => {
    if (node.left) leftLinks.push(node.left);
    if (node.right) rightLinks.push(node.right);
  });

  const uniqueLeftLinks = [...new Set(leftLinks)];
  const uniqueRightLinks = [...new Set(rightLinks)];

  // check anomaly, if every link is unique return false (no anomaly)
  return (
    leftLinks.length === uniqueLeftLinks.length &&
    rightLinks.length === uniqueRightLinks.length
  );
}
