![npm downloads total](https://img.shields.io/npm/dt/react-custom-contextmenu.svg) ![npm version](https://img.shields.io/npm/v/react-custom-contextmenu.svg) ![npm license](https://img.shields.io/npm/l/react-custom-contextmenu.svg)

# react-custom-contextmenu
A slim implementation to support custom contextmenus in React

## Installation
```
npm install --save react-custom-contextmenu
```
or
```
yarn add react-custom-contextmenu
```

## Usage
Example:
```
import React from 'react';
import ContextMenu from 'react-custom-contextmenu';

const Content = (props) => (
  <ContextMenu>
    <div>
      Right click me ...
    </div>
    {/** Wrap the custom context menu in the ContextMenu.Renderer **/}
    <ContextMenu.Renderer>
      {({ show, dismiss, x, y }) => {
        if (!show) return null;

        return (
          <div
            style={{
              display: 'block',
              left: `${x}px`,
              top: `${y}px`,
              position: 'absolute',
              zIndex: 10,
              'box-shadow': '0 4px 5px 3px rgba(0, 0, 0, 0.2)',
              background: '#ffffff',
              padding: 10,
            }}>
            <ul>
              <li onClick={dismiss}>
                Manually close the ContextMenu via the dismiss function.
              </li>
              <li>You can create whatever type of UI you want!</li>
              <li>Automatically closes onblur, mousewheel, mousedown, escape key</li>
            </ul>
          </div>
        )
      }}
    </ContextMenu.Renderer>
  </ContextMenu>
);
```

## ContextMenu
The main content of your UI needs to be wrapped with a ContextMenu component. This obfuscates the internal logic needed to launch, and dismiss the custom context menu. 

## ContextMenu.Renderer
This is the component responsible for rendering the custom context menu UI. It is called as a [function component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) and offers some useful information. 

**ContextMenu.Renderer(args)**
- `args`:
    - `show`: *boolean* whether to render the custom UI
    - `dismiss`: *function* dismisses the context menu manually
    - `x`: *number* the X position to render the context menu
    - `y`: *number* the Y position to render the context menu

