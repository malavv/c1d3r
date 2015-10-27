module.exports = {
  verbose: false,
  suites: ['tests/'],
  plugins: {
    local: {
      browsers: ['chrome', 'firefox']
    }
  },
};