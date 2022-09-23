// 1. Büyük Ünlü Uyumu (Find if palatal harmony in the word.)
function determinePalatalHarmony(word) {
  const boldVowels = /[aıou]/gi;
  const thinVowels = /[eiöü]/gi;

  const boldWordLetters = boldVowels.test(word);
  const thinWordLetters = thinVowels.test(word);

  return (
    (boldWordLetters && !thinWordLetters) ||
    (!boldWordLetters && thinWordLetters)
  );
}

// 2. Pazar Günlerini Bulma (Find the sundays that is the 1st day of month)
function findSundays() {
  const sundays = [];

  const fromDate = new Date();
  let year = 1900;
  let month = 1;

  while (year < 2000) {
    if (month === 12) {
      year++;
      month = 1;
    }
     fromDate.setFullYear(year, month++, 1);

    // getDay method gets the day of the week, 0 is Sunday
    if (fromDate.getDay() === 0) {
      // getDay and getMonth starts from 0
      const getDay = fromDate.getDay() + 1;
      const getMonth = fromDate.getMonth() + 1;
      const getYear = fromDate.getFullYear();
      const date = `${getDay}/${getMonth}/${getYear}`;

      sundays.push(date);
    }
  }

  return sundays;
}

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
