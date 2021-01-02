import React from "react";

import jet from "@randajan/jetpack";

export default {
    flags(flags, ...args) {
        const result = new Set();

        jet.map.it(flags, (flag, key)=>{
            flag = jet.str.to(flag, ...args);
            if (!flag || flag === "false") { return; }
            else if (flag === "true") { result.add(key); } 
            else { result.add(flag); }
        }, true);

        return jet.obj.prop.add(Array.from(result), {
            toString:function() { return jet.map.melt(this, " "); }
        });

    },

    inject(rele, injection, deep, filter) {
        const level = jet.num.tap(deep);

        return React.Children.toArray(rele).map((r, key)=>{
            if (!jet.rele.is(r)) { return r; }

            const include = (!filter || filter.includes(r.type));
            const inject = jet.obj.to(include ? injection : null, r, key, level);
            const children = deep ? jet.rele.inject(inject.children || r.props.children, injection, level+1, filter) : null;
            if (children) { inject.children = children; }
            return jet.obj.is.full(inject) ? jet.rele.copy(r, inject) : rele;
        });
    },

}