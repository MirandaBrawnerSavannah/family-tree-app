import React from 'react';
import profileStyles from './PersonProfile.module.css';

const PersonProfile = ({ person }) => {
  return (
    <div className={profileStyles.profile}>
      <h2 className={profileStyles.nameHeading}>{person.fullName}</h2>
    </div>
  );
};
export default PersonProfile;
