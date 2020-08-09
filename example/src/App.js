import React, { useRef } from 'react'

import jet, { usePromise, useShift, useDrag, useSwipe } from '@randajan/react-jetpack';

window.jet = jet

const App = (props) => {
  const eng = usePromise(new Promise(res=>setTimeout(res, 5000)));
  console.log(eng);
  return (
    <div className="App">
      <TestShift/>
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
  const [ref, shifting] = useSwipe(console.log, ["down"]);
  return <div ref={ref} className={shifting?"float":"static"} style={{width:"100px", height:"100px", top:"50%", left:"50%", "backgroundColor":"gray", position:"absolute", transform:"translate(-50%, -50%)"}}/>
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
