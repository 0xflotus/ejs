es5.ES5Parser = (function(unicode, OMeta, _) {

  var ES5Parser=OMeta.inherit({_grammarName: "ES5Parser",
  "isKeyword":function(){var x;return (function(){x=this._apply("anything");return this._pred(this["spec"].keyword(x))}).call(this)},
  "idFirst":function(){var x;return (function(){x=this._apply("char");return this._pred(this["spec"].idFirst(x))}).call(this)},
  "idPart":function(){var x;return (function(){x=this._apply("char");return this._pred(this["spec"].idPart(x))}).call(this)},
  "whitespace":function(){var x;return (function(){x=this._apply("char");return this._pred(this["spec"].whitespaces(x))}).call(this)},
  "linebreak":function(){var x;return (function(){x=this._apply("char");return this._pred(this["spec"].linebreaks(x))}).call(this)},
  "token":function(){var t,tt;return (function(){tt=this._apply("anything");this._apply("spaces");return this._or((function(){return (function(){t=this._or((function(){return this._apply("punctuator")}),(function(){return this._apply("keyword")}));this._pred((t.value() == tt));return t}).call(this)}),(function(){return (function(){t=this._or((function(){return this._apply("name")}),(function(){return this._apply("number")}),(function(){return this._apply("string")}));this._pred((t[(0)] == tt));return t}).call(this)}))}).call(this)},
  "comment":function(){return this._or((function(){return (function(){switch(this._apply('anything')){case "/":return (function(){this._applyWithArgs("exactly","/");"//";this._many((function(){return (function(){this._not((function(){return this._apply("linebreak")}));return this._apply("char")}).call(this)}));return this._lookahead((function(){return this._apply("linebreak")}))}).call(this);default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return this._applyWithArgs("fromTo","/*","*/")}))},
  "space":function(){return this._or((function(){return this._apply("whitespace")}),(function(){return this._apply("comment")}),(function(){return this._apply("linebreak")}))},
  "spacesNoNl":function(){return this._many((function(){return (function(){this._not((function(){return this._apply("linebreak")}));return this._apply("space")}).call(this)}))},
  "sc":function(){return this._or((function(){return (function(){this._apply("spacesNoNl");return this._or((function(){return this._apply("linebreak")}),(function(){return this._lookahead((function(){return this._applyWithArgs("exactly","}")}))}),(function(){return this._apply("end")}))}).call(this)}),(function(){return this._applyWithArgs("token",";")}))},
  "nameFirst":function(){return this._or((function(){return this._apply("idFirst")}),(function(){return (function(){switch(this._apply('anything')){case "$":return "$";case "_":return "_";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return this._apply("escapeSeq")}))},
  "namePart":function(){return this._or((function(){return this._apply("nameFirst")}),(function(){return this._apply("idPart")}),(function(){return this._apply("digit")}))},
  "identifier":function(){return this._consumedBy((function(){return (function(){this._apply("nameFirst");return this._many((function(){return this._apply("namePart")}))}).call(this)}))},
  "name":function(){var n;return (function(){n=this._apply("identifier");this._not((function(){return this._applyWithArgs("isKeyword",n)}));return _.Id(n)}).call(this)},
  "keyword":function(){var k;return (function(){k=this._apply("identifier");this._applyWithArgs("isKeyword",k);return _.Keyword(k)}).call(this)},
  "hexDigit":function(){return this._or((function(){return this._apply("digit")}),(function(){return this._applyWithArgs("range","a","f")}),(function(){return this._applyWithArgs("range","A","F")}))},
  "hex":function(){var d;return (function(){d=this._consumedBy((function(){return (function(){this._applyWithArgs("exactly","0");this._applyWithArgs("exactly","x");"0x";return this._many1((function(){return this._apply("hexDigit")}))}).call(this)}));return _.Number(parseInt(d)).kind("hex")}).call(this)},
  "decimalInt":function(){return this._or((function(){return (function(){switch(this._apply('anything')){case "0":return "0";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","0")}));this._apply("digit");return this._many((function(){return this._apply("digit")}))}).call(this)}))},
  "expPart":function(){return (function(){(function(){switch(this._apply('anything')){case "E":return "E";case "e":return "e";default: this.bt.mismatch('Jumptable did not match')}}).call(this);this._opt((function(){return (function(){switch(this._apply('anything')){case "-":return "-";case "+":return "+";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}));return this._many1((function(){return this._apply("digit")}))}).call(this)},
  "decimal":function(){var f;return this._or((function(){return (function(){f=this._consumedBy((function(){return (function(){this._opt((function(){return this._applyWithArgs("exactly","-")}));this._apply("decimalInt");this._opt((function(){return (function(){this._applyWithArgs("exactly",".");return this._many1((function(){return this._apply("digit")}))}).call(this)}));return this._opt((function(){return this._apply("expPart")}))}).call(this)}));return _.Number(f)}).call(this)}),(function(){return (function(){f=this._consumedBy((function(){return (function(){this._opt((function(){return this._applyWithArgs("exactly","-")}));this._applyWithArgs("exactly",".");this._many1((function(){return this._apply("digit")}));return this._opt((function(){return this._apply("expPart")}))}).call(this)}));return _.Number(f)}).call(this)}))},
  "number":function(){return this._or((function(){return this._apply("hex")}),(function(){return this._apply("decimal")}))},
  "escapeSeq":function(){var s;return (function(){s=this._consumedBy((function(){return (function(){this._applyWithArgs("exactly","\\");return this._or((function(){return (function(){switch(this._apply('anything')){case "x":return (function(){this._apply("hexDigit");return this._apply("hexDigit")}).call(this);case "u":return (function(){this._apply("hexDigit");this._apply("hexDigit");this._apply("hexDigit");return this._apply("hexDigit")}).call(this);default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return this._apply("char")}))}).call(this)}));return unescape(s)}).call(this)},
  "string":function(){var cs;return (function(){switch(this._apply('anything')){case "\"":return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeSeq")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\"")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\"");return _.String(cs.join(""))}).call(this);case "\'":return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeSeq")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\'")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\'");return _.String(cs.join(""))}).call(this);default: this.bt.mismatch('Jumptable did not match')}}).call(this)},
  "punctuator":function(){var s;return (function(){s=(function(){switch(this._apply('anything')){case "/":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "/=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "/"}));case ",":return ",";case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "|=";case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "||=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "||"}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "|"}));case "^":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "^=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "^"}));case "~":return "~";case "-":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "-=";case "-":return "--";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "-"}));case "[":return "[";case "!":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "!==";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "!="}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "!"}));case "{":return "{";case "%":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "%=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "%"}));case "+":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "+=";case "+":return "++";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "+"}));case ")":return ")";case "}":return "}";case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "===";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "=="}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "="}));case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "<=";case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "<<=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "<<"}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "<"}));case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return ">=";case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return ">>=";case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return ">>>=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return ">>>"}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return ">>"}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return ">"}));case "?":return "?";case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "&=";case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "&&=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "&&"}));default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "&"}));case "(":return "(";case ":":return ":";case "*":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "*=";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}),(function(){return "*"}));case ".":return ".";case ";":return ";";case "]":return "]";default: this.bt.mismatch('Jumptable did not match')}}).call(this);return _.Punctuator(s)}).call(this)},
  "expr":function(){var le;return (function(){le=this._applyWithArgs("listOf","assignExpr",",");return ((le["length"] > (1))?_.SequenceExpr(le):le[(0)])}).call(this)},
  "assignExpr":function(){var rhs,lhs,op;return this._or((function(){return (function(){lhs=this._apply("leftExpr");op=this._or((function(){return this._applyWithArgs("token","=")}),(function(){return this._applyWithArgs("token","+=")}),(function(){return this._applyWithArgs("token","-=")}),(function(){return this._applyWithArgs("token","*=")}),(function(){return this._applyWithArgs("token","/=")}),(function(){return this._applyWithArgs("token","%=")}),(function(){return this._applyWithArgs("token","<<=")}),(function(){return this._applyWithArgs("token","^=")}),(function(){return this._applyWithArgs("token","&&=")}),(function(){return this._applyWithArgs("token","&=")}),(function(){return this._applyWithArgs("token","||=")}),(function(){return this._applyWithArgs("token","|=")}),(function(){return this._applyWithArgs("token",">>>=")}),(function(){return this._applyWithArgs("token",">>=")}));rhs=this._apply("assignExpr");return _.AssignExpr(lhs,rhs).operator(op.value())}).call(this)}),(function(){return this._apply("condExpr")}))},
  "condExpr":function(){var f,t,e;return (function(){e=this._apply("orExpr");return this._or((function(){return (function(){this._applyWithArgs("token","?");t=this._apply("assignExpr");this._applyWithArgs("token",":");f=this._apply("assignExpr");return _.CondExpr(e,t,f)}).call(this)}),(function(){return (function(){this._apply("empty");return e}).call(this)}))}).call(this)},
  "orExpr":function(){var y,x;return this._or((function(){return (function(){x=this._apply("orExpr");this._applyWithArgs("token","||");y=this._apply("andExpr");return _.BinaryExpr(x,y).operator("||")}).call(this)}),(function(){return this._apply("andExpr")}))},
  "andExpr":function(){var y,x;return this._or((function(){return (function(){x=this._apply("andExpr");this._applyWithArgs("token","&&");y=this._apply("bitOrExpr");return _.BinaryExpr(x,y).operator("&&")}).call(this)}),(function(){return this._apply("bitOrExpr")}))},
  "bitOrExpr":function(){var y,x;return this._or((function(){return (function(){x=this._apply("bitOrExpr");this._applyWithArgs("token","|");y=this._apply("bitXorExpr");return _.BinaryExpr(x,y).operator("|")}).call(this)}),(function(){return this._apply("bitXorExpr")}))},
  "bitXorExpr":function(){var y,x;return this._or((function(){return (function(){x=this._apply("bitXorExpr");this._applyWithArgs("token","^");y=this._apply("bitAndExpr");return _.BinaryExpr(x,y).operator("^")}).call(this)}),(function(){return this._apply("bitAndExpr")}))},
  "bitAndExpr":function(){var y,x;return this._or((function(){return (function(){x=this._apply("bitAndExpr");this._applyWithArgs("token","&");y=this._apply("eqExpr");return _.BinaryExpr(x,y).operator("&")}).call(this)}),(function(){return this._apply("eqExpr")}))},
  "eqExpr":function(){var y,x,op;return this._or((function(){return (function(){x=this._apply("eqExpr");op=this._or((function(){return this._applyWithArgs("token","==")}),(function(){return this._applyWithArgs("token","!=")}),(function(){return this._applyWithArgs("token","===")}),(function(){return this._applyWithArgs("token","!==")}));y=this._apply("relExpr");return _.BinaryExpr(x,y).operator(op.value())}).call(this)}),(function(){return this._apply("relExpr")}))},
  "relExpr":function(){var y,x,op;return this._or((function(){return (function(){x=this._apply("relExpr");op=this._or((function(){return this._applyWithArgs("token",">=")}),(function(){return this._applyWithArgs("token",">")}),(function(){return this._applyWithArgs("token","<=")}),(function(){return this._applyWithArgs("token","<")}),(function(){return this._applyWithArgs("token","instanceof")}),(function(){return this._applyWithArgs("token","in")}));y=this._apply("shiftExpr");return _.BinaryExpr(x,y).operator(op.value())}).call(this)}),(function(){return this._apply("shiftExpr")}))},
  "shiftExpr":function(){var y,x,op;return this._or((function(){return (function(){x=this._apply("shiftExpr");op=this._or((function(){return this._applyWithArgs("token",">>>")}),(function(){return this._applyWithArgs("token",">>")}),(function(){return this._applyWithArgs("token","<<")}));y=this._apply("addExpr");return _.BinaryExpr(x,y).operator(op.value())}).call(this)}),(function(){return this._apply("addExpr")}))},
  "addExpr":function(){var y,x,op;return this._or((function(){return (function(){x=this._apply("addExpr");op=this._or((function(){return this._applyWithArgs("token","+")}),(function(){return this._applyWithArgs("token","-")}));y=this._apply("mulExpr");return _.BinaryExpr(x,y).operator(op.value())}).call(this)}),(function(){return this._apply("mulExpr")}))},
  "mulExpr":function(){var y,x,op;return this._or((function(){return (function(){x=this._apply("mulExpr");op=this._or((function(){return this._applyWithArgs("token","*")}),(function(){return this._applyWithArgs("token","/")}),(function(){return this._applyWithArgs("token","%")}));y=this._apply("prefixExpr");return _.BinaryExpr(x,y).operator(op.value())}).call(this)}),(function(){return this._apply("prefixExpr")}))},
  "prefixExpr":function(){var e,op;return this._or((function(){return (function(){op=this._or((function(){return this._applyWithArgs("token","++")}),(function(){return this._applyWithArgs("token","--")}));this._apply("spacesNoNl");e=this._apply("unaryExpr");return _.UpdateExpr(e).operator(op.value())}).call(this)}),(function(){return this._apply("unaryExpr")}))},
  "unaryExpr":function(){var e,op;return this._or((function(){return (function(){op=this._or((function(){return this._applyWithArgs("token","!")}),(function(){return this._applyWithArgs("token","~")}),(function(){return this._applyWithArgs("token","+")}),(function(){return this._applyWithArgs("token","-")}),(function(){return this._applyWithArgs("token","void")}),(function(){return this._applyWithArgs("token","delete")}),(function(){return this._applyWithArgs("token","typeof")}));e=this._apply("prefixExpr");return _.UnaryExpr(e).operator(op.value())}).call(this)}),(function(){return this._apply("postfixExpr")}))},
  "postfixExpr":function(){var e,op;return this._or((function(){return (function(){e=this._apply("leftExpr");this._apply("spacesNoNl");op=this._or((function(){return this._applyWithArgs("token","++")}),(function(){return this._applyWithArgs("token","--")}));return _.UpdateExpr(e).operator(op.value()).prefix(false)}).call(this)}),(function(){return this._apply("leftExpr")}))},
  "leftExpr":function(){var n;return this._or((function(){return (function(){this._applyWithArgs("token","new");n=this._apply("leftExpr");return _.NewExpr(n)}).call(this)}),(function(){return this._apply("accessExpr")}))},
  "accessExpr":function(){var p;return this._or((function(){return (function(){p=this._apply("accessExpr");return this._applyWithArgs("callExpr",p)}).call(this)}),(function(){return (function(){p=this._apply("accessExpr");return this._applyWithArgs("memberExpr",p)}).call(this)}),(function(){return this._apply("funcExpr")}),(function(){return this._apply("primExpr")}))},
  "callExpr":function(){var p,as;return (function(){p=this._apply("anything");this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","assignExpr",",");this._applyWithArgs("token",")");return _.CallExpr(p,as)}).call(this)},
  "memberExpr":function(){var p,f,i;return (function(){p=this._apply("anything");return this._or((function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");return _.MemberExpr(p,i)}).call(this)}),(function(){return (function(){this._applyWithArgs("token",".");f=this._applyWithArgs("token","Id");return _.MemberExpr(p).name(f.value())}).call(this)}))}).call(this)},
  "primExpr":function(){var e;return this._or((function(){return (function(){this._applyWithArgs("token","this");return _.ThisExpr()}).call(this)}),(function(){return this._applyWithArgs("token","Id")}),(function(){return this._applyWithArgs("token","Number")}),(function(){return this._applyWithArgs("token","String")}),(function(){return this._apply("objectLiteral")}),(function(){return this._apply("arrayLiteral")}),(function(){return (function(){this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");return _.GroupExpr(e)}).call(this)}),(function(){return this._apply("reLiteral")}))},
  "arrayLiteral":function(){var es,f,cs;return (function(){this._applyWithArgs("token","[");es=this._or((function(){return (function(){f=this._apply("arrayEl");cs=this._many((function(){return (function(){this._applyWithArgs("token",",");return this._apply("arrayEl")}).call(this)}));return [f].concat(cs)}).call(this)}),(function(){return (function(){this._apply("empty");return []}).call(this)}));this._applyWithArgs("token","]");return _.ArrayExpr(es)}).call(this)},
  "arrayEl":function(){return this._or((function(){return this._apply("assignExpr")}),(function(){return (function(){this._apply("empty");return undefined}).call(this)}))},
  "objectLiteral":function(){var bs;return (function(){this._applyWithArgs("token","{");bs=this._applyWithArgs("listOf","objBinding",",");this._applyWithArgs("token","}");return _.ObjectExpr(bs)}).call(this)},
  "objBinding":function(){var f,t,n,v;return this._or((function(){return (function(){this._apply("spaces");t=this._consumedBy((function(){return (function(){switch(this._apply('anything')){case "s":return (function(){this._applyWithArgs("exactly","e");this._applyWithArgs("exactly","t");return "set"}).call(this);case "g":return (function(){this._applyWithArgs("exactly","e");this._applyWithArgs("exactly","t");return "get"}).call(this);default: this.bt.mismatch('Jumptable did not match')}}).call(this)}));this._apply("spaces");n=this._apply("objPropName");f=this._apply("funcRest");return _.PropertyBinding(n,f["args"],f["body"]).kind(t)}).call(this)}),(function(){return (function(){n=this._apply("objPropName");this._applyWithArgs("token",":");v=this._apply("assignExpr");return _.PropertyBinding(n,v)}).call(this)}))},
  "objPropName":function(){return this._or((function(){return this._applyWithArgs("token","Id")}),(function(){return this._applyWithArgs("token","String")}),(function(){return this._applyWithArgs("token","Number")}))},
  "reLiteral":function(){var b,f;return (function(){this._apply("spaces");this._applyWithArgs("exactly","/");b=this._consumedBy((function(){return this._apply("reBody")}));this._applyWithArgs("exactly","/");f=this._consumedBy((function(){return this._many((function(){return this._apply("reFlag")}))}));return _.RegExpr(b).flags(f)}).call(this)},
  "reBody":function(){return (function(){this._apply("reFirst");return this._many((function(){return this._apply("reChar")}))}).call(this)},
  "reChar":function(){return this._or((function(){return this._apply("reFirst")}),(function(){return (function(){switch(this._apply('anything')){case "*":return "*";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}))},
  "reFirst":function(){return this._or((function(){return (function(){this._not((function(){return (function(){switch(this._apply('anything')){case "/":return "/";case "*":return "*";case "[":return "[";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}));return this._apply("reClassChar")}).call(this)}),(function(){return this._apply("reClass")}),(function(){return (function(){switch(this._apply('anything')){case "]":return "]";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}))},
  "reClass":function(){return (function(){this._applyWithArgs("exactly","[");this._many((function(){return this._apply("reClassChar")}));return this._applyWithArgs("exactly","]")}).call(this)},
  "reClassChar":function(){return this._or((function(){return this._apply("escapeSeq")}),(function(){return (function(){this._not((function(){return (function(){switch(this._apply('anything')){case "\\":return "\\";case "]":return "]";case "\n":return "\n";case "\r":return "\r";default: this.bt.mismatch('Jumptable did not match')}}).call(this)}));return this._apply("char")}).call(this)}))},
  "reFlag":function(){return this._apply("letter")},
  "funcDecl":function(){var f,n;return (function(){this._applyWithArgs("token","function");n=this._applyWithArgs("token","Id");f=this._apply("funcRest");return _.Function(f["args"],f["body"]).id(n.value())}).call(this)},
  "funcExpr":function(){var f;return this._or((function(){return (function(){this._applyWithArgs("token","function");f=this._apply("funcRest");return _.Function(f["args"],f["body"]).expr(true)}).call(this)}),(function(){return (function(){f=this._apply("funcDecl");return f.expr(true)}).call(this)}))},
  "funcRest":function(){var args,block;return (function(){this._applyWithArgs("token","(");args=this._apply("funcArgs");this._applyWithArgs("token",")");block=this._apply("block");return ({"args": args,"body": block})}).call(this)},
  "funcArgs":function(){var a;return (function(){a=this._applyWithArgs("listOf","formal",",");return _.FunctionArgs(a)}).call(this)},
  "formal":function(){return this._applyWithArgs("token","Id")},
  "bindings":function(){var bs;return (function(){this._applyWithArgs("token","var");bs=this._applyWithArgs("listOf","binding",",");return _.VarDeclStmt(bs)}).call(this)},
  "binding":function(){var n,v;return (function(){n=this._applyWithArgs("token","Id");v=this._opt((function(){return this._or((function(){return (function(){this._applyWithArgs("token","=");return this._apply("assignExpr")}).call(this)}),(function(){return (function(){this._apply("empty");return _.Id("undefined")}).call(this)}))}));return _.VarBinding(n.value(),v)}).call(this)},
  "block":function(){var ss;return (function(){this._applyWithArgs("token","{");ss=this._many((function(){return this._apply("srcElem")}));this._applyWithArgs("token","}");return _.BlockStmt(ss)}).call(this)},
  "stmt":function(){var f,t,e,x,s,bs,n,i,v,cs,c,l,u;return this._or((function(){return (function(){bs=this._apply("bindings");this._apply("sc");return bs}).call(this)}),(function(){return (function(){this._applyWithArgs("token","if");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");t=this._apply("stmt");return this._or((function(){return (function(){this._applyWithArgs("token","else");f=this._apply("stmt");return _.IfStmt(c,t,f)}).call(this)}),(function(){return (function(){this._apply("empty");return _.IfStmt(c,t)}).call(this)}))}).call(this)}),(function(){return (function(){this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return _.WhileStmt(c,s)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","do");s=this._apply("stmt");this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");this._apply("sc");return _.DoWhileStmt(s,c)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");i=this._opt((function(){return this._or((function(){return this._apply("bindings")}),(function(){return this._apply("expr")}))}));this._applyWithArgs("token",";");c=this._opt((function(){return this._apply("expr")}));this._applyWithArgs("token",";");u=this._opt((function(){return this._apply("expr")}));this._applyWithArgs("token",")");s=this._apply("stmt");return _.ForStmt(i,c,u,s)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");v=this._or((function(){return this._apply("bindings")}),(function(){return this._apply("leftExpr")}));this._applyWithArgs("token","in");e=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return _.ForInStmt(v,e,s)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","switch");this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");this._applyWithArgs("token","{");cs=this._many((function(){return this._or((function(){return (function(){this._applyWithArgs("token","case");c=this._apply("expr");this._applyWithArgs("token",":");cs=this._many((function(){return this._apply("srcElem")}));return _.SwitchCase(c,cs)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","default");this._applyWithArgs("token",":");cs=this._many((function(){return this._apply("srcElem")}));return _.SwitchCase(cs)}).call(this)}))}));this._applyWithArgs("token","}");return _.SwitchStmt(e,cs)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","break");this._apply("spacesNoNl");n=this._apply("name");this._apply("sc");return _.BreakStmt().label(n.value())}).call(this)}),(function(){return (function(){this._applyWithArgs("token","break");this._apply("sc");return _.BreakStmt()}).call(this)}),(function(){return (function(){this._applyWithArgs("token","continue");this._apply("spacesNoNl");n=this._apply("name");this._apply("sc");return _.ContinueStmt().label(n.value())}).call(this)}),(function(){return (function(){this._applyWithArgs("token","continue");this._apply("sc");return _.ContinueStmt()}).call(this)}),(function(){return (function(){this._applyWithArgs("token","throw");this._apply("spacesNoNl");e=this._apply("expr");this._apply("sc");return _.ThrowStmt(e)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","try");t=this._apply("block");this._applyWithArgs("token","catch");this._applyWithArgs("token","(");n=this._applyWithArgs("token","Id");this._applyWithArgs("token",")");c=this._apply("block");f=this._opt((function(){return (function(){this._applyWithArgs("token","finally");return this._apply("block")}).call(this)}));return _.TryStmt(t,n,c,f)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","try");t=this._apply("block");this._applyWithArgs("token","finally");f=this._apply("block");return _.TryStmt(t,f)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","return");e=this._apply("expr");this._apply("sc");return _.ReturnStmt(e)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","with");this._applyWithArgs("token","(");x=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return _.WithStmt(x,s)}).call(this)}),(function(){return (function(){l=this._applyWithArgs("token","Id");this._applyWithArgs("token",":");s=this._apply("stmt");return _.LabeledStmt(l.value(),s)}).call(this)}),(function(){return (function(){this._applyWithArgs("token",";");return _.EmptyStmt()}).call(this)}),(function(){return (function(){this._apply("spaces");this._not((function(){return this._or((function(){return this._applyWithArgs("token","{")}),(function(){return this._applyWithArgs("token","function")}),(function(){return this._apply("sc")}))}));e=this._apply("expr");this._apply("sc");return e}).call(this)}),(function(){return this._apply("block")}))},
  "srcElem":function(){return this._or((function(){return this._apply("funcDecl")}),(function(){return this._apply("stmt")}))},
  "topLevel":function(){var el;return (function(){el=this._many((function(){return this._apply("srcElem")}));this._apply("spaces");this._apply("end");return _.Program(el)}).call(this)}});(ES5Parser["spec"]=({"whitespaces": unicode.matcher(["TAB","VT","FF","SP","NBSP","BOM","Zs"]),"linebreaks": unicode.matcher(["LF","CR","LS","PS"]),"idFirst": unicode.matcher(["L","Nl"]),"idPart": unicode.matcher(["Mn","Mc","Nd","Pc","ZWNJ","ZWJ"]),"keywords": ["break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","export","extends","for","finally","function","if","import","in","instanceof","new","return","super","switch","this","throw","try","typeof","var","void","while","with"],"future_keywords": ["implements","interface","let","package","private","protected","public","yield"],"keyword": (function (k){return (this["keywords"].indexOf(k) != (- (1)))})}));(ES5Parser["parse"]=(function (input){return ES5Parser.matchAll(input,"topLevel")}));

  return ES5Parser;

})(utils.unicode, OMeta, es5.nodes);