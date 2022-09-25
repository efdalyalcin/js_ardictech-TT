// 1. Büyük Ünlü Uyumu (Find if palatal harmony in the word.)
// I believe we are looking for the best case algorithm for Palatal Harmony
// This one is O(n) in worst case.
// If we are gonna feed with an dictionary (words array) it will give an other O(n)
// which will result to O(n^2)
function isPalatalHarmony(word) {
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

// console.log(findSundays());

// 3. İkil Ağaçta Anomali Tespiti
// (Find if there is an anomaly like there are 2 links directing to same node
// in a binary tree algorithm)

// creation of the node tree
// if node doesn't have a child it gets false
const node = (value, left = false, right = false) => ({ value, left, right });
const tree = [node(5, 3, 7), node(7, 6), node(11, 5, 13), node(13, 12)];
// Initial tree looks like sth like this
  // tree = [
  //   {value: 5, left: 3, right: 7},
  //   {value: 7, left: 6, right: false},
  //   {value: 11, left: 5, right: 13},
  //   {value: 13, left: 12, right: false},
  // ]

// the old code was O(3n) which means O(n) in worst case
// but if I try to instantly return the code when there is an anomaly,
// the complexity is O(n * 2n) => O(n^2) in the worst case
// I am not sure for this one because if no anomaly, it will take much more time.
function hasAnomalyInBinaryTree(tree) {
  const linkedNodes = [];

  const isAnomaly = tree.some((node) => {
    if (node.left) {
      if (linkedNodes.includes(node.left)) return true;

      linkedNodes.push(node.left)
    }
    if (node.right) {
      if (linkedNodes.includes(node.right)) return true;

      linkedNodes.push(node.right)
    }
    if (node.right === node.value || node.left === node.value) {
      return true
    }

    return false
  });

  return isAnomaly;
}
