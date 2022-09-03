import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logoutSuccess } from '../redux/authActions';

class TopBar extends Component {
  
  render() {
    const { t, username, isLoggedIn, onLogoutSuccess } = this.props;
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/login">
            {t("Login")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );

    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav ml-auto">
          <li>
            <Link className="nav-link" to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li
            className="nav-link"
            onClick={onLogoutSuccess}
            style={{ cursor: "pointer" }}
          >
            {t("Logout")}
          </li>
        </ul>
      );
    }

    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img
              src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-chat-vector-icon-png-image_3791366.jpg"
              width="50"
              alt="Hoaxify Logo"
            />
            Hoaxify
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
  return{
    isLoggedIn: store.isLoggedIn,
    username: store.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogoutSuccess: () => dispatch(logoutSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);

