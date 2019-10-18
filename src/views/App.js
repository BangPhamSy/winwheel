import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "../helpers/polyfills";
import { Routes, PrivateRoutes, SharedRoutes } from "../configs";
import PrivateRoute from "./components/routes/PrivateRoute";
import RouteWithSubRoutes from "./components/routes/RouteWithSubRoutes";
import Layout from "./layout/Layout";
import PrivateLayout from "./layout/PrivateLayout";

class App extends React.Component {
  accessGranted = true;
  render() {
    const { currentLanguage, location, keepLogin } = this.props;
    const isAuthenticated = this.props.isAuthenticated;
    // const isAuthenticated = true;
    if (this.accessGranted)
      return (
        <Layout {...this.props} isAuthenticated={isAuthenticated}>
          {isAuthenticated === false && (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={250}>
                <Switch location={location}>
                  {Routes.map((route, index) => (
                    <RouteWithSubRoutes
                      key={index}
                      {...route}
                      isAuthenticated={isAuthenticated}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                  {PrivateRoutes.map((route, index) => (
                    <PrivateRoute
                      key={index}
                      {...route}
                      isAuthenticated={isAuthenticated}
                      currentLanguage={currentLanguage}
                      keepLogin={keepLogin}
                    />
                  ))}
                  {SharedRoutes.map((route, index) => (
                    <RouteWithSubRoutes
                      key={index}
                      {...route}
                      isAuthenticated={isAuthenticated}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
          {isAuthenticated === true && (
            <PrivateLayout {...this.props}>
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={250}
                >
                  <Switch location={location}>
                    {PrivateRoutes.map((route, index) => (
                      <PrivateRoute
                        key={index}
                        {...route}
                        isAuthenticated={isAuthenticated}
                        currentLanguage={currentLanguage}
                        keepLogin={keepLogin}
                      />
                    ))}
                    {Routes.map((route, index) => (
                      <RouteWithSubRoutes
                        key={index}
                        {...route}
                        isAuthenticated={isAuthenticated}
                        currentLanguage={currentLanguage}
                      />
                    ))}
                    {SharedRoutes.map((route, index) => (
                      <PrivateRoute
                        key={index}
                        {...route}
                        isAuthenticated={isAuthenticated}
                        currentLanguage={currentLanguage}
                      />
                    ))}
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </PrivateLayout>
          )}
        </Layout>
      );
    else return <p> You shall not pass </p>;
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth, locale, router }) => ({
  isAuthenticated: auth.isAuthenticated,
  keepLogin: auth.keepLogin,
  translate: getTranslate(locale),
  location: router.location,
  currentLanguage: getActiveLanguage(locale).code
});

export default withRouter(connect(mapStateToProps)(App));
