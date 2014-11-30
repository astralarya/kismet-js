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
            type: 'string'
          }}},
        function(err, input) {
          if(input.input !== 'quit') {
            var result;
            if(input.input) {
              result = kismet.parse(input.input)
            } else if(prev) {
              result = kismet.parse(prev)
            } else {
              result = kismet.parse('')
            }
            if(callback) {
              callback(result);
            } else {
              if(result.formula != result.value) {
                console.log('[' + result.formula + '] ' + result.value);
              } else {
                console.log(result.value);
              }
            }
            loop(result.formula);
          }
        });
    };
    loop();
  }
};
