import React, { Component } from "react";

import jet from "@randajan/jetpack";

jet.type.define(1, "reactElement", React.isValidElement.bind(React), (type, ...args)=>React.createElement(type||"div", ...args), React.cloneElement.bind(React))
jet.type.define(1, "reactComponent", _=> _ instanceof Component, (...args)=> new Component(...args));

jet.to.define("reactElement", {
    array:_=>React.Children.toArray(_),
})

jet.to.define("reactComponent", {
    reactElement:_=>_.render()
})

export default jet;