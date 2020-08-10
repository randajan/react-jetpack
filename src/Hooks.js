import React, { useRef, useState, useEffect } from 'react';

import jet from "@randajan/jetpack";

function useForceRender() {
  const rerender = useState()[1];
  return useState(_=>_=>rerender({}))[0];
}

function usePromise(prom, deps) {
  const [ eng, setEng ] = useState();
  const rerender = useForceRender();

  useEffect(_=>{
    setEng(prom = jet.to("engage", prom));
    prom.then(rerender, rerender);
  }, jet.arr.wrap(deps));

  return eng;
}

function useDrag(onMove) {
  const [move, setMove] = useState(false);
  const ref = useRef();

  useEffect(_=>jet.event.listenDrag(ref.current, (ev, bound)=>{
    if (bound.state !== "move") { setMove(bound.state === "start"); }
    jet.run(onMove, bound);
  }));

  return [ref, move];
}

function useShift(onShift, initX, initY, absolute) {
  const [move, setMove] = useState(false);
  const ref = useRef();
    
  useEffect(_=>jet.event.listenShift(ref.current, (ev, bound)=>{
    if (bound.state !== "move") { setMove(bound.state === "start"); }
    jet.run(onShift, bound);
  }, initX, initY, absolute), [initX, initY, absolute]);

  return [ref, move];
}

function useSwipe(onSwipe, allowDir, minDist, maxTime) {
  const ref = useRef();
    
  useEffect(
    _=>jet.event.listenSwipe(ref.current, (ev, bound)=>jet.run(onSwipe, bound), allowDir, minDist, maxTime), 
    [allowDir, minDist, maxTime]
  );

  return [ref];
}

export {
  useForceRender,
  usePromise,
  useDrag,
  useShift,
  useSwipe,
};