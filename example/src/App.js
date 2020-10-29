import React, { useRef, useState } from 'react'

import jet, { useForceRender, useEngage, useShift, useDrag, useSwipe, useFocus, CSSLib, CSSFile } from '@randajan/react-jetpack';

const csslib = new CSSLib();
const cssfile1 = csslib.open({App:"App10", x:12, d:14})
const cssfile2 = csslib.open({a:1, App:"App12", c:4}, {b:4, App:"App12", c:2}, cssfile1);

console.log(cssfile1, cssfile2);
window.jet = jet

const App = (props) => {
  const [eng, prev] = useEngage(_=>new Promise(res=>setTimeout(_=>res("ok"))));
  return (
    <div className={cssfile2.get("App")}>
      <TestShift/>
      <FocusMan/>
      <TestInject>
        <ul>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
        </ul>
      </TestInject>
    </div>
  )
}

const TestShift = props=>{
  const [val, setVal] = useState(.5);
  window.setVal = setVal;
  const [ref, shifting] = useShift(console.log, val, val);
  return <div ref={ref} className={shifting?"float":"static"} style={{width:"100px", height:"100px", top:"50%", left:"50%", "backgroundColor":"gray", position:"absolute", transform:"translate(-50%, -50%)"}}/>
}

const FocusMan = props=>{
  const [focus, setFocus] = useState();
  const ref = useFocus(focus, setFocus);
  console.log(focus);
  return (
    <div ref={ref} style={{width:"100px", height:"100px", "background-color":focus?"black":"gray"}}/>
  )
}

const TestInject = (props) => {

  return jet.react.injectProps(
    props.children, (ele, key, level)=>{
      return {children:key+":"+level, id:"li-"+key+"-"+level}
    },
    true, "li"
  );
}

export default App
