class Unauthenticated extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = Unauthenticated