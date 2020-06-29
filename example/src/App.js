import React from 'react'

import jet, { usePromise } from '@randajan/react-jetpack';

window.jet = jet

const App = (props) => {

  return (
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
