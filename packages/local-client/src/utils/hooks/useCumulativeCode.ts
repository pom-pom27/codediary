import useTypedSelector from "./useTypedSelector";

export const useCumulativeCoder = (cellId: string) => {
  const mergedCode = useTypedSelector((state) => {
    const { data, order } = state.cells;

    const orderedCell = order.map((id) => data[id]);

    const renderFunc = `
      import _React from 'react'
      import _ReactDOM from 'react-dom'

      var render = (value) => {
       const root = document.querySelector('#root');
      if (typeof value  === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }}
    `;

    const mergedCode = [];
    const noRenderFunc = "var render = (value) => {}";

    for (const c of orderedCell) {
      if (c.type === "code") {
        if (c.id === cellId) {
          mergedCode.push(renderFunc);
        } else {
          mergedCode.push(noRenderFunc);
        }

        mergedCode.push(c.content);
      }

      if (c.id === cellId) {
        break;
      }
    }

    return mergedCode;
  });

  return mergedCode.join("\n");
};
