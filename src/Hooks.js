import React, { useRef, useState, useEffect } from 'react';

import jet from "@randajan/jetpack";

const PRIVATE = []

function useForceRender() {
  const render = useState()[1];

  const id = useState(_=>PRIVATE.push({
    mount:false,
    rerender:_=>{ if (PRIVATE[id].mount) { render({}); } }
  })-1)[0];
  
  useEffect(_=>{
    PRIVATE[id].mount = true;
    return _=>PRIVATE[id].mount = false;
  }, []);
  
  return PRIVATE[id].rerender;
}

function useEngage(set, cache) {
  const toEng = (...a)=>jet.to("engage", jet.run(set, ...a));

  const rerender = useForceRender();
  const [ eng, setEng ] = useState(toEng);

  useEffect(_=>{
    const { pending, end } = eng;
    if (!pending && cache && cache < (new Date() - end)) { setEng(toEng()); }
  });

  useEffect(_=>{ eng.finally(rerender); }, [eng]);

  return [eng, (...a)=>setEng(toEng(...a))];
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
  useEngage,
  useDrag,
  useShift,
  useSwipe,
};