// 1. Büyük Ünlü Uyumu (Find if palatal harmony in the word.)
// I believe we are looking for the best case algorithm for Palatal Harmony
// This one is O(n) in worst case.
// If we are gonna feed with an dictionary (words array) it will give an other O(n)
// which will result to O(n^2)
function isPalatalHarmony(word) {
  const lowerCase = word.toLocaleLowerCase('tr');
  let boldVowelCount = 0; // [aouı]
  let thinVowelsCount = 0; // [eiöü]

  for (let i = 0; i < word.length; i++) {
    if (
      lowerCase[i] === "a" ||
      lowerCase[i] === "o" ||
      lowerCase[i] === "u" ||
      lowerCase[i] === "ı"
    ) {
      boldVowelCount++;
    }

    if (
      lowerCase[i] === "e" ||
      lowerCase[i] === "i" ||
      lowerCase[i] === "ö" ||
      lowerCase[i] === "ü"
    ) {
      thinVowelsCount++;
    }

    // this turns false as soon as there are both thin and bold vowels
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

  const LEAP_YEAR = {
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
        while (sundayDate < LEAP_YEAR[key]) {
          sundayDate += WEEK_DAYS;
        }

        sundayDate -= LEAP_YEAR[key];
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
const node = (left = false, right = false) => ({left, right });
const tree = [node(3, 7), node(4, 6), node(13), node(11, 12)];
const anomalyTree = [node(3, 7), node(1, 2), node(5, 13), node(4, 13)];
// Initial tree looks like sth like this
  // tree = [
  //   {left: 3, right: 7},
  //   {left: 4, right: 6},
  //   {left: 13, right: false},
  //   {left: 11, right: 12},
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

    return false
  });

  return isAnomaly;
}
