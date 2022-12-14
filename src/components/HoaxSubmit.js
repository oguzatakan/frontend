import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { postHoax } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

const HoaxSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));
  const [focused, setFocused] = useState(false);
  const [hoax, setHoax] = useState("");
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setHoax("");
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [hoax])

  const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');

  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
    };
    try {
      await postHoax(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  let textAreClass = 'form-control';
  if (errors.content) {
    textAreClass += ' is-invalid';
  }

  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault
        image={image}
        width="32"
        height="32"
        className="rounded-circle mr-1"
      />
      <div className="flex-fill">
        <textarea
          className={textAreClass}
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          onChange={(event) => setHoax(event.target.value)}
          value={hoax}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <div className="text-right mt-1">
            <ButtonWithProgress className="btn btn-primary" onClick={onClickHoaxify} text="Mesajlar" pendingApiCall={pendingApiCall} disabled={pendingApiCall}/>
            <button
              className="btn btn-light d-inline-flex ml-1"
              onClick={() => setFocused(false)}
              disabled={pendingApiCall}
            >
              <span className="material-icons">cancel</span>
              {t("Cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoaxSubmit;
