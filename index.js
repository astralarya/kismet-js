/* project settings */


/* dependencies */

var kismet = require('./dist/kismet').parser;


/* exports */

module.exports = {
  /**
   * Parse a dice roll and return the result
   * @param {String} A dice roll
   * @result Result of the roll
   */
  parse: function(input) {
    return kismet.parse(input);
  }
};
