
import jet from "@randajan/jetpack";

class CSSFile {
    static transitions = ["appear", "appearActive", "appearDone", "enter", "enterActive", "enterDone", "exit", "exitActive", "exitDone"];

    constructor(css, file) {
        jet.obj.addProperty(this, { css, file});
    }

    get(...classNames) {
        const result = new Set();

        jet.obj.map(classNames, v=>{
            const cn = jet.str.to(v);
            result.add(this.css.get(cn));
            result.add(jet.obj.get(this.file, cn));
        }, true);

        return jet.obj.addProperty(Array.from(result), {
            toString:function() { return this.joins(" ") }
        });
    }

    transitions() {
        const result = {};
        CSSFile.transitions.map(v=>result[v] = this.get(v).toString());
        return result;
    }
    
}

class CSSLib {

    constructor(defs) { this.define(defs); }

    define(defs) { this.defs = jet.obj.merge(this.defs, defs); return this; }

    get(className) { return jet.obj.get(this.defs, className) || className; }

    open(css) { return new CSSFile(this, css);}
}

export {
    CSSLib,
    CSSFile
}