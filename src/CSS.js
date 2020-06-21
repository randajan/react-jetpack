
import jet from "@randajan/jetpack";

class CSSFile {
    constructor(css, file) {
        jet.obj.addProperty(this, { css, file});
    }

    get(...classNames) {
        const cns = new Set();

        jet.obj.map(classNames, v=>{
            const cn = jet.str.to(v);
            cns.add(this.css.get(cn));
            cns.add(jet.obj.get(this.file, cn));
        }, true);

        return Array.from(cns);
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