import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import Input from "./Input";
import { updateUser } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import { updateSuccess } from "../redux/authActions";

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      displayName: undefined,
    }));
  }, [updatedDisplayName]);

  const { username, displayName, image } = user;

  const { t } = useTranslation();

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

  const onClickSave = async () => {
    const body = {
      displayName: updatedDisplayName,
    };
    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
      dispatch(updateSuccess(response.data));
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };
  const pendingApiCall = useApiProgress("put", "/api/1.0/users/" + username);

  const { displayName: displayNameError } = validationErrors;

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault
          className="rounded-circle shadow"
          alt={`${username}profile`}
          image={image}
          width={"70"}
          height={"70"}
        />
      </div>
      <div className="card-body">
        {!inEditMode && (
          <>
            <h3>
              {displayName}@{username}
            </h3>
            {editable && (
              <button
                className="btn btn-success d-inline-flex"
                onClick={() => setInEditMode(true)}
              >
                <span className="material-icons">edit</span>
                {t("Edit")}
              </button>
            )}
          </>
        )}
        {inEditMode && (
          <div>
            <Input
              label={t("Change Display Name")}
              defaultValue={displayName}
              onChange={(event) => {
                setUpdatedDisplayName(event.target.value);
              }}
              error={displayNameError}
            />
            <div>
              <ButtonWithProgress
                className="btn btn-primary d-inline-flex"
                onClick={onClickSave}
                disabled={pendingApiCall}
                text={
                  <>
                    <span className="material-icons">save</span>
                    {t("Save")}
                  </>
                }
              />
              <button
                className="btn btn-light d-inline-flex ml-1"
                onClick={() => setInEditMode(false)}
                disabled={pendingApiCall}
              >
                <span className="material-icons">cancel</span>
                {t("Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
