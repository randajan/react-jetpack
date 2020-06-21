import jet from "@randajan/jetpack";

jet.react = {
    fetchFlags:function(flags, ...args) {
        const result = new Set();

        jet.obj.map(flags, (flag, key)=>{
            flag = jet.to("string", flag, ...args);
            if (!flag || flag === "false") { return; }
            else if (flag === "true") { result.add(key); } 
            else { result.add(flag); }
        }, true);

        return Array.from(result);
    },

    injectProps:function(children, injection, deep, filter) {
        const level = jet.get("number", deep);
        filter = jet.arr.wrap(filter);
        
        return jet.to("array", children).map((ele, key)=>{

            if (!jet.is("reactElement", ele)) { return ele; }
            const include = (jet.isEmpty(filter) || filter.includes(ele.type));
            const inject = jet.to("object", include ? injection : null, ele, key, level);
            const children = deep ? jet.react.injectProps(ele.props.children, injection, level+1, filter) : null;
            if (children) { inject.children = children; }

            return jet.isFull(inject) ? jet.copy(ele, inject) : ele;
        });
    },

}