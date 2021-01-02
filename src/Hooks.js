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

function useEngage(set, cache, ...deps) {
  const toEng = (next, prev, ...a)=>{
    const eng = jet.eng.to(jet.fce.run(set, ...a));
    if (!next || !next.pending) { return [eng, next]; }
    next.cancel();
    return [ eng, prev||next ];
  };

  const rerender = useForceRender();
  const [ [ next, prev ], setEng ] = useState(toEng);

  useEffect(_=>{ setEng(toEng(next, prev)); }, deps);

  useEffect(_=>{
    const { pending, end } = next;
    if (!pending && cache && cache < (new Date() - end)) { setEng(toEng(next, prev)); }
  });

  useEffect(_=>{ next.finally(rerender); }, [next]);

  return [next, prev, (...a)=>setEng(toEng(next, prev, ...a))];
}

function useMove(event, onMove, opt) {
  const [move, setMove] = useState(false);
  const ref = useRef();

  useEffect(_=>jet.ele.listen[event](ref.current, (ev, bound)=>{
    if (bound.state !== "move") { setMove(bound.state === "start"); }
    jet.fce.run(onMove, bound);
  }, opt), jet.arr.to(opt));

  return [ref, move];
}

function useDrift(onDrift, opt) { return useMove("drift", onDrift, opt);}
function useDrag(onDrag, opt) { return useMove("drag", onDrag, opt);}
function useSwipe(onSwipe, opt) { return useMove("swipe", onSwipe, opt);}

function useFocus(focus, setFocus, lock) {
  const ref = useRef();

  useEffect(_=>{
    if (lock || !ref) { return; }

    const handler = ev=>{
        const target = ev.target;
        const now = (ref.current && (ref.current === target || ref.current.contains(target)));
        if (!focus !== !now) { setFocus(now); }
    }

    if (focus) { return jet.ele.listen(document, "mouseup", handler); }
    else if (ref.current) { return jet.ele.listen(ref.current, "mouseup", handler); }


  }, [focus, lock]);

  return ref;
}

export {
  useForceRender,
  useEngage,
  useDrift,
  useDrag,
  useSwipe,
  useFocus
};