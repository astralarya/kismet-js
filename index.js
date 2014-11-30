/* project settings */


/* dependencies */

var prompt = require('prompt'),
    kismet = require('./dist/kismet').parser;

prompt.message = '';
prompt.delimiter = '';
prompt.colors = false;


/* exports */

module.exports = {
  /**
   * Parse a dice roll and return the result
   * @param {String} A dice roll
   * @result Result of the roll
   */
  parse: function(input) {
    return kismet.parse(input);
  },

  /**
   * Start an interactive session
   */
  prompt: function(callback) {
    prompt.start();
    function loop(prev) {
      prompt.get({
        properties: {
          input: {
            description: '>>>',
            type: 'string',
            default: prev
          }}},
        function(err, result) {
          if(result.input !== 'quit') {
            var result = kismet.parse(result.input)
            if(callback) {
              callback(result);
            } else {
              console.log(result);
            }
            loop(result.input);
          }
        });
    };
    loop();
  }
};
