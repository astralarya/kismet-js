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
        {return null;}
;

expr
    : expr '+' expr
        {$$ = $1+$3;}
    | expr '-' expr
        {$$ = $1-$3;}
    | expr '*' expr
        {$$ = $1*$3;}
    | expr '/' expr
        {$$ = $1/$3;}
    | expr '^' expr
        {$$ = Math.pow($1, $3);}
    | '-' expr %prec UMINUS
        {$$ = -$2;}
    | '(' expr ')'
        {$$ = $2;}
    | roll
        {$$ = $1;}
    | number
        {$$ = $1;}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
;

roll
    : die
        {$$ = Math.floor((Math.random() * Number($1)) + 1);}
    | expr die
        { $$ = 0;
          for(var i = 0; i < Number($1); i++) {
            $$ += Math.floor((Math.random() * Number($2)) + 1);
          }
        }
;

die
    : 'd' expr
        {$$ = $2}
    | 'd' '%'
        {$$ = 100;}
;

number
    : INT
        {$$ = Number($1);}
    | FRAC
        {$$ = Number($1);}
    | EXP
        {$$ = Number($1);}
    | INT FRAC
        {$$ = Number($1+$2);}
    | INT EXP
        {$$ = Number($1+$2);}
    | FRAC EXP
        {$$ = Number($1+$2);}
    | INT FRAC EXP
        {$$ = Number($1+$2+$3);}
;
