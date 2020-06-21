import React from 'react'

import jet, { usePromise } from '@randajan/react-jetpack';

window.jet = jet

const App = (props) => {

  return (
  <div>
    {jet.react.injectProps(<div className="fuck"/>, ({"data-flags":jet.react.writeFlags({failed:true, missed:_=>_}, true), id:"super", className:"ok"}), true, "div")}
  </div>
  )
}

export default App
