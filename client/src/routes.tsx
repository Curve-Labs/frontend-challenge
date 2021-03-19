import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Swap from "./pages/swap";

export function Routes() {
  return (
    <>
      <HashRouter basename={"/"}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/swap" />
          </Route>
          <Route exact path="/swap">
            <Swap />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}
