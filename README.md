# @randajan/react-jetpack

> @randajan/jetpack modification for react

[![NPM](https://img.shields.io/npm/v/@randajan/react-jetpack.svg)](https://www.npmjs.com/package/@randajan/react-jetpack) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @randajan/react-jetpack
```

## __React - jetpack pseudo-types__

This module includes two pseudo-types.
The main reason for these pseudo-types is to secure reactElement and reactComponent from being maped with _jet.obj.map_.

 * "reactElement"
 * "reactComponent"

### Example
```jsx

jet.type(<div/>) === "reactElement";
jet.is("reactElement", <div/>) === true;

jet.copy(<div/>, {id:"foo"}) === <div id="foo"/>
jet.get("reactElement") === <div/>


```

## __Details__

### __Export__
name | type | arguments | return | use
--- | --- | --- | --- | ---
jet | React Element | props | div container | Provider
CSSLib | class | defs | instance | Provide CSS module, where you can redefine classNames for whole project
CSSFile | class | CSSLib, file | instance | Provide wrap of require(_file.css_). 
useForceRender | Hook | - | function | Create function for rerendering. Instance of this function will stay same after rerender
useEngage | Hook | function, number | { result, pending, error } | Will handle any promise for you. Second argument is cachetime in ms.


#### __jet.react.fetchFlags__
_It will transform the multidimensional object to fill the custom attribute "data-flags". If the iteration proces found true (boolean) it will append the key instead of the value. Any function will be called with provided arguments._

* Arguments
  * flags: _mapable_
  * ...args: _any variables_ (will be passed to every function in flags variable) 
* Return
  * _array with flags_
* Example
  * ["foo", "bar", "any"] === jet.react.fetchFlags({nokey:v=>v, bar=>v==="foo", nofunction:"any"}, "foo")


#### __jet.react.injectProps__
_It will inject the return of injection to props of every children that met the filter criteria. Filter should be array with react types (or empty for disable filtering)._

* Arguments
  * children: _React.Children_
  * injection: _function / object_ (the [children, key, level] will be passed to this function)
  * deep: _boolean_ (iterating nested children, it will affect the level pass to the injection function)
  * filter: _array_ (React types that will be injected)
* Return
  * _React.Children (array)_
* Example

```jsx

jet.react.injectProps(<p id="bar"/>, {id:"foo"}) === <p id="foo"/>

jet.react.injectProps(<div><p id="bar"/></div>, child=>({id:"foo"}), false) === <div id="foo"><p id="bar"/></div>

jet.react.injectProps(<div><p id="bar"/></div>, child=>({id:child.type}), true) === <div id="div"><p id="p"/></div>

jet.react.injectProps(<div><p id="bar"/></div>, child=>({id:"foo"+child.props.id}), true, ["p"]) === <div><p id="foobar"/></div>

```

### __CSSLib__

#### __Overview__
CSSLib help managing clasNames across libraries.
It can help adding multiple unique classNames cause it supports nested mapable objects. It can even resolve the functions anywhere inside. CSSLib should be created and instance exported with library for redefine the default classNames anywhere else

#### __CSSLib.constructor / CSSLib.define__
_Define classNames translation for current CSSLib._

* Arguments
  * defs: _object_ (flat object) 
* Return
  * _CSSLib_

#### CSSLib.open__
_Wraping the *.css into the CSSFile instance_

* Arguments
  * file: _object_ (webpack require(*.css)) 
* Return
  * _CSSFile_

#### __CSSFile.get__
_It will return flat array with unique classNames. Array is enhanced so it will automatically joined separated with spaces instead of commas_

* Arguments
  * ...classNames: _object_ (support nested objects) 
* Return
  * _array_


## License

MIT © [randajan](https://github.com/randajan)
