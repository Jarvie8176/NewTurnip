import { Layout } from "antd";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { RoutesMapping } from "../../shared/RoutesMapping";
import AuthComponent from "../auth/auth.component";
import { ControlPanel } from "../controlPanel/controlPanel.ui";
import { IntroComponent } from "../intro/intro.ui";
import { NotFoundPageComponent } from "../pages/notFoundPage.component";
import { RoomPageComponent } from "../pages/roomPage.component";
import PriceRecordsComponent from "../priceRecords/priceRecords.component";
import ProfileComponent from "../profile/profile.component";
import { CreateRoomComponent } from "../room/createRoom.component";
import { RoomPanelComponent } from "../room/roomPanel.component";

const RoomRoute = observer(() => {
  //  const { roomStore } = useRootStore();
  //  const { roomId } = useParams();

  //  if (!roomId) {
  //    NotificationManager.ShowError(new Error("cannot find room"));
  //    return <Fragment />;
  //  }

  //  roomStore.loadRoom(roomId).catch(NotificationManager.ShowError);
  return <RoomPageComponent />;
});

const ContentWrapper = styled.div`
  & > * {
    margin-bottom: 1em;
  }
`;

export const Routes = () => {
  return (
    <Router>
      <Fragment>
        <Layout.Header>
          <h2 style={{ color: "#fff" }}>炒萝卜啦！动物森友会</h2>
        </Layout.Header>
        <Layout.Content style={{ padding: "2.5vh 2.5vw", maxWidth: "100vw" }}>
          <ContentWrapper>
            <IntroComponent />
            <ControlPanel />
            <div>
              <Switch>
                <Route exact path={RoutesMapping.ROOMS_SPECIFIC} component={RoomRoute} />
                <Route exact path={RoutesMapping.ROOMS} component={RoomPanelComponent} />
                <Route exact path={RoutesMapping.PRICE_RECORDS} component={PriceRecordsComponent} />
                // todo: define specific routes
                {/*<Route exact path={"/priceRecords/latest"} component={PriceRecordsComponent} />*/}
                {/*<Route exact path={"/priceRecords/me/candlestick"} component={PriceRecordsComponent} />*/}
                {/*<Route exact path={"/priceRecords/me"} component={PriceRecordsComponent} />*/}
                <Route exact path={"/"} component={() => <Redirect to={"/priceRecords"} />} />
                <Route exact path={"/404"} component={NotFoundPageComponent} />
                <Redirect to={"/404"} />
              </Switch>
            </div>
          </ContentWrapper>
        </Layout.Content>
        <ProfileComponent />
        <AuthComponent />
        <CreateRoomComponent />
      </Fragment>
    </Router>
  );
};
