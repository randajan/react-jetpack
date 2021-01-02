
import React, { Component } from "react";

import jet from "@randajan/jetpack";

import rele from "./rele";

import { CSSLib, CSSFile } from "./CSS";

import { useForceRender, useEngage, useDrift, useDrag, useSwipe, useFocus } from "./Hooks";

jet.type.define("rele", Component, {
    rank:1,
    is:x=>React.isValidElement(x),
    create:(x, ...args)=>React.createElement(jet.str.tap(x, "div"), ...args),
    copy:(x, ...a)=>React.cloneElement(x, ...a)
}, rele);

jet.type.define("rent", Component, {
    rank:1,
});

jet.rele.to.define({
    array:x=>React.Children.toArray(x),
})

jet.rent.to.define({
    reactElement:x=>x.render()
})



export default jet;
export {
  jet,
  CSSLib,
  CSSFile,
  useForceRender,
  useEngage,
  useDrift,
  useDrag,
  useSwipe,
  useFocus
}