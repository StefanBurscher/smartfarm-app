const KEYBOARD_TYPE = {
  DEFAULT: 'default',
  NUMERIC: 'numeric',
  EMAIL: 'email-address',
  PHONE: 'phone-pad'
}

const AUTO_CAPITALIZE = {
  CHARACTERS: 'characters', // all characters
  WORDS: 'words', // first letter of each word
  SENTENCES: 'sentences', // first letter of each sentence
  NONE: 'none' // don't auto capitalize anything
}

export default {
  KEYBOARD_TYPE,
  AUTO_CAPITALIZE
}

export { KEYBOARD_TYPE, AUTO_CAPITALIZE }
