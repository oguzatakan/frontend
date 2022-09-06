import React from 'react';

const ProfileImageWithDefault = props => {

    return <img alt={`Profile`} src={"https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"} { ...props } />
};

export default ProfileImageWithDefault;