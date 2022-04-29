import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Header, Navigation } from "./components";
import {
  Chat,
  Follow,
  Home,
  MyPage,
  // NotFound,
  Review,
  Login,
  RegionSet,
  Setprofile,
  Store,
  StoreDetail,
} from "./pages";
import { Test } from "./pages";
import { history } from "./redux/configureStore";
import RedirectHandler from "./pages/redirectHandeler";
// import { useDispatch } from "react-redux";
// import { getToken } from "./shared/token";
// import { actionCreators as userActions } from "./redux/modules/user";
import ToastMessage from "./shared/ToastMessage";
import Modal from "./shared/modal/Modal";
import { useSelector } from "react-redux";

function App() {
  // const dispatch = useDispatch();
  const modalOn = useSelector((state) => state.modal.modalOn);

  return (
    <>
      <ConnectedRouter history={history}>
        <Navigation />
        <Header>ARTILY</Header>
        <Switch>
          <Route path={["/home", "/"]} exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/store" exact component={Store} />
          <Route path="/store/:postId" exact component={StoreDetail} />
          <Route path="/follow" exact component={Follow} />
          <Route path="/store" exact component={Store} />
          <Route path="/store/:id" exact component={StoreDetail} />
          <Route path="/review" exact component={Review} />
          <Route path="/test" component={Test} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/regionset" exact component={RegionSet} />
          <Route path="/profile" exact component={Setprofile} />
          <Route path="/oauth/kakao/callback" component={RedirectHandler} />
          {/* <Route path="/*" component={NotFound} /> */}
          <Route path="/*" component={Test} />
        </Switch>

        {modalOn && <Modal />}

        <ToastMessage />
      </ConnectedRouter>
    </>
  );
}
export default App;
