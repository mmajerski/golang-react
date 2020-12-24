import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Books from "./containers/Books";
import CreateBook from "./containers/CreateBook";
import Nav from "./components/Nav";

function App() {
  const [pathname, setPathname] = useState("");

  return (
    <Router>
      <div className="App">
        <Nav setPathname={setPathname} pathname={pathname} />
        <Switch>
          <Route path="/" exact component={() => <Books />} />
          <Route path="/create" exact component={() => <CreateBook />} />
          <Route
            path="/edit/:id"
            exact
            component={(props) => <CreateBook {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
