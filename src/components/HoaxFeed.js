import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getHoaxes, getOldHoaxes } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import HoaxView from "./HoaxView";
import Spinner from "./Spinner";

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const { t } = useTranslation();
  const { username } = useParams();

  const path = username
    ? `/api/1.0/users/${username}/hoxes?page=`
    : "/api/1.0/hoxes?page=";
  const initialHoaxLoadProgress = useApiProgress("get", path);
  let lastHoaxId = 0;
  if (hoaxPage.content.length > 0) {
    const lastHoaxIndex = hoaxPage.content.length - 1;
    lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
  }

  const loadOldHoaxesProgress = useApiProgress("get", "/api/1.0/hoaxes/" + lastHoaxId, true);

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const response = await getHoaxes(username, page);
        setHoaxPage((previousHoaxPage) => ({
          ...response.data,
          content: [...previousHoaxPage.content, ...response.data.content],
        }));
      } catch (error) {}
    };
    loadHoaxes();
  }, [username]);

  const loadOldHoaxes = async () => {
    const response = await getOldHoaxes(lastHoaxId);
    setHoaxPage((previousHoaxPage) => ({
      ...response.data,
      content: [...previousHoaxPage.content, ...response.data.content],
    }));
  };

  const { content, last } = hoaxPage;

  if (content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {initialHoaxLoadProgress ? <Spinner /> : t("There are no hoaxes")}
      </div>
    );
  }

  return (
    <div>
      {content.map((hoax) => {
        return <HoaxView key={hoax.id} hoax={hoax} />;
      })}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          style={{ cursor: loadOldHoaxesProgress ? "not-allowed" : "pointer" }}
          onClick={loadOldHoaxesProgress ? () => {} : () => loadOldHoaxes()}
        >
          {loadOldHoaxesProgress ? <Spinner /> : t("Load old hoaxes")}
        </div>
      )}
    </div>
  );
};

export default HoaxFeed;
