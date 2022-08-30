/**

BENEFITS
- Ability to separate the two keys PHYSICALLY
- Easier to remember a password than a full seed phrase
- Can do this with pen and paper

Randomly shuffle and unshuffle a seed phrase using a password of any length.

1 - Format password as a list of characters at least as long as the length of the seed phrase
    - If password not long enough, "loop" through it from the beginning until it is as long as the seed phrase
      - e.g. 'abc' -> ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']
2 - Get the character code of each item in this list using a well-known character encoding
3 - Replace each number with the sum of itself and ALL numbers after it
4 - Modulo each number by (index + 1)
5 - Fisher-Yates shuffle:
    [10, 11, 2, 1, 9]
    ['word one', 'word two']

STEPS
1 - Create a list of numbers >= `seedPhraseLength` up to the password length from the password's characters using a well-known encoding (e.g. ASCII):
    - If the password is too short, loop e.g. [1, 2, 3] -> [1, 2, 3, 1, 2, 3, 1, 2, 3]
    - alternatively: could "enforce" a 12-char minimum?
2 - For each item in this list, replace it with the sum of itself and all items beyond (up to `seedPhraseLength`)
3 - Modulo each number by (`seedPhraseLength` + 1) - i

~ 12 = half a billion combos, a few days to brute force IF ADDRESS KNOWN
  - could this be somehow scaled? 
    - would giving the user the choice of encoding help? using a random encoding? 
~ 24 -> "impractical"

*/

const SEED_PHRASE = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve"
];
const PASSWORD = "password1234";

function getCharCodesFromPassword(
  password,
  seedPhraseLength,
  encoding = "ASCII"
) {
  let passwordCharCodes = [];
  const longestInput =
    password.length > seedPhraseLength ? password.length : seedPhraseLength;

  for (let i = 0; i < longestInput; i++) {
    if (i < password.length) {
      passwordCharCodes.push(password.charCodeAt(i));
    }
    // Looping back through a password shorter than phrase length
    else {
      passwordCharCodes.push(password.charCodeAt(i % password.length));
    }
  }

  return passwordCharCodes;
}

function getSummedCharCodes(passwordCharCodes, seedPhraseLength) {
  let summedCharCodes = [];

  for (let i = 0; i < seedPhraseLength; i++) {
    let sum = 0;

    for (let n = i; n < passwordCharCodes.length; n++) {
      sum += passwordCharCodes[n];
    }

    summedCharCodes.push(sum);
  }

  return summedCharCodes;
}

function getRandomIndices(summedCharCodes) {
  let randomIndices = [];

  for (let i = 0; i < summedCharCodes.length; i++) {
    randomIndices.push(summedCharCodes[i] % (i + 1));
  }

  return randomIndices;
}

function getRandomIndicesFromPassword(password, seedPhraseLength) {
  // Step One
  const passwordCharCodes = getCharCodesFromPassword(
    password,
    seedPhraseLength
  );

  // Step Two
  const summedCharCodes = getSummedCharCodes(
    passwordCharCodes,
    seedPhraseLength
  );

  // Step Three
  const randomIndices = getRandomIndices(summedCharCodes);

  return randomIndices;
}

// Fisher–Yates shuffle
function shuffleSeedPhrase(seedPhrase, randomIndices) {
  let currentIndex = seedPhrase.length,
    randomIndex;

  // Loop backwards through `seedPhrase`
  while (currentIndex != 0) {
    currentIndex--;
    randomIndex = randomIndices[currentIndex];

    // Swap word at `currentIndex` with word at `randomIndex`
    [seedPhrase[currentIndex], seedPhrase[randomIndex]] = [
      seedPhrase[randomIndex],
      seedPhrase[currentIndex]
    ];
  }

  return seedPhrase;
}

// Reverse Fisher–Yates shuffle
function unshuffleSeedPhrase(shuffledSeedPhrase, password) {
  const randomIndices = getRandomIndicesFromPassword(
    password,
    shuffledSeedPhrase.length
  );
  const unshuffledSeedPhrase = shuffledSeedPhrase;

  for (let i = 0; i < randomIndices.length; i++) {
    [shuffledSeedPhrase[i], shuffledSeedPhrase[randomIndices[i]]] = [
      shuffledSeedPhrase[randomIndices[i]],
      shuffledSeedPhrase[i]
    ];
  }

  return unshuffledSeedPhrase;
}

const randomIndices = getRandomIndicesFromPassword(PASSWORD, 12);

console.log("seed phrase:", SEED_PHRASE);
console.log(
  "shuffled seed phrase:",
  shuffleSeedPhrase(SEED_PHRASE, randomIndices)
);
console.log(
  "unshuffled seed phrase:",
  unshuffleSeedPhrase(SEED_PHRASE, PASSWORD)
);
