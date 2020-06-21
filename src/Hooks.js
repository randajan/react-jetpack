import React, { useState, useEffect } from 'react';

import jet from "@randajan/jetpack";

function useForceRender() {
  const rerender = useState()[1];
  return useState(_=>_=>rerender({}))[0];
}

function usePromise(promise, deps) {
  const [state, setState] = useState(_=>({pending:true}));

  useEffect(_=>{
    jet.to("promise", promise).then(result=>setState({result, pending:false}), error=>setState({error, pending:false}));
  }, jet.arr.wrap(deps));

  return state;
}

export {
  useForceRender,
  usePromise
};