
import jet from "@randajan/jetpack";

class CSSFile {
    static transitions = ["appear", "appearActive", "appearDone", "enter", "enterActive", "enterDone", "exit", "exitActive", "exitDone"];

    constructor(lib, ...files) {
        const base = {};
        jet.obj.addProperty(this, { lib, base});

        files.map(f=>{
            if (jet.is(CSSFile, f)) { f = f.base; }
            jet.obj.map(f, (v,k)=>this.add(k, v));
        });
    }

    add(className, ...aliases) {
        return (this.base[className] = this.base[className] || []).push(...jet.str.to(aliases, ",").split(","))
    }

    get(...classNames) {
        const result = new Set();

        jet.obj.map(classNames, v=>{
            const cn = jet.str.to(v);
            const cb = jet.obj.get(this.base, cn);
            result.add(this.lib.get(cn));
            if (cb) { cb.map(v=>result.add(v)); }
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

    open(...files) { return new CSSFile(this, ...files);}
}

export {
    CSSLib,
    CSSFile
}