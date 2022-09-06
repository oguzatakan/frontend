import React from "react";
import { Link } from "react-router-dom";

const UserListItem = (props) => {
  const { user } = props;
  const { username, displayName } = user;

  return (
    <Link to={`/user/${username}`} className="list-group-item list-group-item-action">
        <img className="rounded-circle" alt={`${username}profile`} src={"https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"} width={"35"} height={"35"}/>
        <span className="pl-2">
            {displayName}@{username}
        </span>
    </Link>
  );
};

export default UserListItem;
