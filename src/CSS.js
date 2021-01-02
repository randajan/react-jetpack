
import jet from "@randajan/jetpack";

class CSSFile {
    static transitions = ["appear", "appearActive", "appearDone", "enter", "enterActive", "enterDone", "exit", "exitActive", "exitDone"];

    constructor(lib, ...files) {
        const base = {};
        jet.obj.prop.add(this, { lib, base });

        files.map(f=>{
            if (jet.type.is(CSSFile, f)) { f = f.base; }
            jet.map.it(f, (v,k)=>this.add(k, v));
        });
    }

    add(className, ...aliases) {
        return (this.base[className] = this.base[className] || []).push(...jet.str.to(aliases, ",").split(","))
    }

    get(...classNames) {
        const result = new Set();

        jet.map.it(classNames, v=>{
            const cn = jet.str.to(v);
            const cb = jet.map.dig(this.base, cn);
            result.add(this.lib.get(cn));
            if (cb) { cb.map(v=>result.add(v)); }
        }, true);

        return jet.obj.prop.add(Array.from(result), {
            toString:function() { return jet.map.melt(this, " "); }
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

    define(defs) { this.defs = jet.map.merge(this.defs, defs); return this; }

    get(className) { return jet.map.dig(this.defs, className) || className; }

    open(...files) { return new CSSFile(this, ...files);}
}

export {
    CSSLib,
    CSSFile
}