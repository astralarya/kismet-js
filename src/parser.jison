/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */;
(?:0|[1-9]\d*)        return 'INT';
(?:\.\d+)             return 'FRAC';
(?:[eE][+-]?\d+)      return 'EXP';
[dD]                  return 'd';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"("                   return '(';
")"                   return ')';
"%"                   return '%';
"PI"                  return 'PI';
"E"                   return 'E';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left 'd'
%left UMINUS

%start input

%% /* language grammar */

input
    : expr EOF
        {return $1;}
    | EOF /* empty */
        {return {formula: null, breakdown: null, value: null};}
;

expr
    : expr '+' expr
        { $$ = {
            formula: $1.formula + '+' + $3.formula,
            breakdown: $1.breakdown + '+' + $3.breakdown,
            value: $1.value + $3.value}; }
    | expr '-' expr
        { $$ = {
            formula: $1.formula + '-' + $3.formula,
            breakdown: $1.breakdown + '-' + $3.breakdown,
            value: $1.value - $3.value}; }
    | expr '*' expr
        { $$ = {
            formula: $1.formula + '*' + $3.formula,
            breakdown: $1.breakdown + '*' + $3.breakdown,
            value: $1.value * $3.value}; }
    | expr '/' expr
        { $$ = {
            formula: $1.formula + '/' + $3.formula,
            breakdown: $1.breakdown + '/' + $3.breakdown,
            value: $1.value / $3.value}; }
    | expr '^' expr
        { $$ = {
            formula: $1.formula + '^' + $3.formula,
            breakdown: $1.breakdown + '^' + $3.breakdown,
            value: Math.pow($1.value, $3.value)}; }
    | '-' expr %prec UMINUS
        { $$ = {
            formula: '-' + $2.formula,
            breakdown: '-' + $2.breakdown,
            value: -$2.value}; }
    | '(' expr ')'
        { $$ = {
            formula: '(' + $2.formula + ')',
            breakdown: '(' + $2.breakdown + ')',
            value: $2.value}; }
    | roll
        { $$ = $1; }
    | number
        { $$ = $1; }
    | E
        { $$ = {
            formula: 'E',
            breakdown: 'E',
            value: Math.E}; }
    | PI
        { $$ = {
            formula: 'PI',
            breakdown: 'PI',
            value: Math.PI}; }
;

roll
    : die
        { var roll = Math.floor((Math.random() * $1.value) + 1);
          $$ = {
            formula: $1.formula,
            breakdown: roll.toString(),
            value: Math.floor((Math.random() * $1.value) + 1)}; }
    | expr die
        { var roll = [];
          for(var i = 0; i < $1.value; i++) {
            roll.push(Math.floor((Math.random() * $2.value) + 1));
          }
          $$ = {
            formula: $1.formula + $2.formula,
            breakdown: '[' + roll.join('+') + ']',
            value: roll.reduce(function(prev, curr) { return prev + curr; })};
        }
;

die
    : 'd' expr
        { $$ = {
            formula: 'd' + $2.formula,
            value: $2.value}; }
    | 'd' '%'
        { $$ = {
            formula: 'd%',
            value: 100}; }
;

number
    : INT
        { $$ = {
            formula: $1,
            breakdown: $1,
            value: Number($1)}; }
    | FRAC
        { $$ = {
            formula: $1,
            breakdown: $1,
            value: Number($1)}; }
    | EXP
        { $$ = {
            formula: $1,
            breakdown: $1,
            value: Number($1)}; }
    | INT FRAC
        { $$ = {
            formula: $1+$2,
            breakdown: $1+$2,
            value: Number($1+$2)}; }
    | INT EXP
        { $$ = {
            formula: $1+$2,
            breakdown: $1+$2,
            value: Number($1+$2)}; }
    | FRAC EXP
        { $$ = {
            formula: $1+$2,
            breakdown: $1+$2,
            value: Number($1+$2)}; }
    | INT FRAC EXP
        { $$ = {
            formula: $1+$2+$3,
            breakdown: $1+$2+$3,
            value: Number($1+$2+$3)}; }
;
