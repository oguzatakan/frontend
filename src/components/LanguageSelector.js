import React from "react";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = (props) => {
  const {i18n} = useTranslation();

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <img
        width={"35"}
        height={"35"}
        src="https://freepikpsd.com/file/2019/10/yuvarlak-türk-bayrağı-png-6-Transparent-Images.png"
        alt="Turkısh Flag"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      ></img>
      <img
        width={"35"}
        height={"35"}
        src="https://e7.pngegg.com/pngimages/1020/23/png-clipart-logo-primera-air-organization-business-english-language-british-flag-flag-logo.png"
        alt="USA Flag"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      ></img>
    </div>
  );
};

export default LanguageSelector;
