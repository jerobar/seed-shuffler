const SEED_PHRASE = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve'
]
const PASSWORD = 'password1234'

function getCharCodesFromPassword(
  password,
  seedPhraseLength,
  encoding = 'ASCII'
) {
  let passwordCharCodes = []
  const longestInput =
    password.length > seedPhraseLength ? password.length : seedPhraseLength

  for (let i = 0; i < longestInput; i++) {
    if (i < password.length) {
      passwordCharCodes.push(password.charCodeAt(i))
    }
    // Looping back through a password shorter than phrase length
    else {
      passwordCharCodes.push(password.charCodeAt(i % password.length))
    }
  }

  return passwordCharCodes
}

function getSummedCharCodes(passwordCharCodes, seedPhraseLength) {
  let summedCharCodes = []

  for (let i = 0; i < seedPhraseLength; i++) {
    let sum = 0

    for (let n = i; n < passwordCharCodes.length; n++) {
      sum += passwordCharCodes[n]
    }

    summedCharCodes.push(sum)
  }

  return summedCharCodes
}

function getRandomIndices(summedCharCodes) {
  let randomIndices = []

  for (let i = 0; i < summedCharCodes.length; i++) {
    randomIndices.push(summedCharCodes[i] % (i + 1))
  }

  return randomIndices
}

function getRandomIndicesFromPassword(password, seedPhraseLength) {
  // Step One
  const passwordCharCodes = getCharCodesFromPassword(password, seedPhraseLength)

  // Step Two
  const summedCharCodes = getSummedCharCodes(
    passwordCharCodes,
    seedPhraseLength
  )

  // Step Three
  const randomIndices = getRandomIndices(summedCharCodes)

  return randomIndices
}

// Fisher–Yates shuffle
function shuffleSeedPhrase(seedPhrase, randomIndices) {
  let currentIndex = seedPhrase.length,
    randomIndex

  // Loop backwards through `seedPhrase`
  while (currentIndex != 0) {
    currentIndex--
    randomIndex = randomIndices[currentIndex]

    // Swap word at `currentIndex` with word at `randomIndex`
    ;[seedPhrase[currentIndex], seedPhrase[randomIndex]] = [
      seedPhrase[randomIndex],
      seedPhrase[currentIndex]
    ]
  }

  return seedPhrase
}

// Reverse Fisher–Yates shuffle
function unshuffleSeedPhrase(shuffledSeedPhrase, password) {
  const randomIndices = getRandomIndicesFromPassword(
    password,
    shuffledSeedPhrase.length
  )
  const unshuffledSeedPhrase = shuffledSeedPhrase

  for (let i = 0; i < randomIndices.length; i++) {
    ;[shuffledSeedPhrase[i], shuffledSeedPhrase[randomIndices[i]]] = [
      shuffledSeedPhrase[randomIndices[i]],
      shuffledSeedPhrase[i]
    ]
  }

  return unshuffledSeedPhrase
}

const randomIndices = getRandomIndicesFromPassword(PASSWORD, 12)

console.log('seed phrase:', SEED_PHRASE)
console.log(
  'shuffled seed phrase:',
  shuffleSeedPhrase(SEED_PHRASE, randomIndices)
)
console.log(
  'unshuffled seed phrase:',
  unshuffleSeedPhrase(SEED_PHRASE, PASSWORD)
)
