import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import CellList from "./components/cells/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

//feature
// added render function  = shortcut to change innerHtml root
// added save cell data to user hard disk
// package based development
// use lerna for multi package manager
// use cli to run the app
