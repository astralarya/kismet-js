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
        {return {formula: null, value: null};}
;

expr
    : expr '+' expr
        { $$ = {
            formula: $1.formula + '+' + $3.formula,
            value: $1.value + $3.value}; }
    | expr '-' expr
        { $$ = {
            formula: $1.formula + '-' + $3.formula,
            value: $1.value - $3.value}; }
    | expr '*' expr
        { $$ = {
            formula: $1.formula + '*' + $3.formula,
            value: $1.value * $3.value}; }
    | expr '/' expr
        { $$ = {
            formula: $1.formula + '/' + $3.formula,
            value: $1.value / $3.value}; }
    | expr '^' expr
        { $$ = {
            formula: $1.formula + '^' + $3.formula,
            value: Math.pow($1.value, $3.value)}; }
    | '-' expr %prec UMINUS
        { $$ = {
            formula: '-' + $2.formula,
            value: -$2.value}; }
    | '(' expr ')'
        { $$ = {
            formula: '(' + $2.formula + ')',
            value: $2.value}; }
    | roll
        { $$ = $1; }
    | number
        { $$ = $1; }
    | E
        { $$ = {
            formula: 'E',
            value: Math.E}; }
    | PI
        { $$ = {
            formula: 'PI',
            value: Math.PI}; }
;

roll
    : die
        { $$ = {
            formula: $1.formula,
            value: Math.floor((Math.random() * $1.value) + 1)}; }
    | expr die
        { var roll = 0;
          for(var i = 0; i < $1.value; i++) {
            roll += Math.floor((Math.random() * $2.value) + 1);
          }
          $$ = {
            formula: $1.formula + $2.formula,
            value: roll};
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
            value: Number($1)}; }
    | FRAC
        { $$ = {
            formula: $1,
            value: Number($1)}; }
    | EXP
        { $$ = {
            formula: $1,
            value: Number($1)}; }
    | INT FRAC
        { $$ = {
            formula: $1+$2,
            value: Number($1+$2)}; }
    | INT EXP
        { $$ = {
            formula: $1+$2,
            value: Number($1+$2)}; }
    | FRAC EXP
        { $$ = {
            formula: $1+$2,
            value: Number($1+$2)}; }
    | INT FRAC EXP
        { $$ = {
            formula: $1+$2+$3,
            value: Number($1+$2+$3)}; }
;
