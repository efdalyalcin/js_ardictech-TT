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

determinePalatalHarmony("enamely");

// 2. Pazar Günlerini Bulma (Find the sundays that is the 1st day of month)
function findSundays() {
  const sundays = [];

  const fromDate = new Date();
  let year = 1900;
  let month = 0;

  while (year < 2000) {
    if (month === 11) {
      year++;
      month = 0;
    }

    fromDate.setFullYear(year, month++, 1);

    if (fromDate.getDay() === 0) {
      const getDay = fromDate.getDay() + 1;
      const getMonth = fromDate.getMonth();
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
