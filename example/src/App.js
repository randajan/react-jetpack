import React, { useRef, useState } from 'react'

import jet, { useForceRender, useEngage, useShift, useDrag, useSwipe, useFocus } from '@randajan/react-jetpack';

window.jet = jet

const App = (props) => {
  const [eng, prev] = useEngage(_=>new Promise(res=>setTimeout(_=>res("ok"))));
  return (
    <div className="App">
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
