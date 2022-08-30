# Seed Shuffler

Randomly shuffle and unshuffle seed phrases using a password of any length.

## Benefits

- Ability to separate two keys physically with neither one being sufficient to access funds.
- Passwords are easier to remember than seed phrases.
- Seed phrase can easily be shuffled/unshuffled with pen and paper.

## Algorithm

### Step One

Format the password as a list of single characters _at least_ as long as the length of the seed phrase. Longer is fine.

If the password is shorter than the length of the seed phrase, repeat the password beginning with the first character until it is exactly equal to the length of the seed phrase.

For example, for password 'abcde' with a seed phrase of 12 words, the character list becomes:

['a', 'b', 'c', 'd', 'e', 'a', 'b', 'c', 'd', 'e', 'a', 'b']

### Step Two

For each character in the list, replace it with its character code (number) using a well-known encoding (e.g. ASCII).

### Step Three

For the first n numbers in the list, where n is the length of the seed phrase, replace it with the sum of itself and every number _after_ it.

### Step Four

For each number in this list, perform the following modulo operation:

`number % (index + 1)`

## Step Five

Use this list as a list of random indexes in a Fisher–Yates shuffle algorithm to shuffle the seed phrase. The item being shuffled should use the random index from the list with the index corresponding to the item's index.

Example:

Seed phrase word list: ['foo', 'bar', 'baz']
Random index list resulting from step four: [2, 1, 0]

'foo' -> 2
'bar' -> 1
'baz' -> 0
