import React from 'react';
import ReactDOM from 'react-dom';
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

const prepareDiv = (name) => {
  const r = document.createElement('div');
  r.id = name;
  document.body.appendChild(r);
  return document.getElementById(name);
};

ReactDOM.render(<Content/>, prepareDiv('root'));
