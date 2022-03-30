import React from 'react';

const PersonProfile = ({ person }) => {
  return (
    <div>
      {person && (
        <div>
          <h2>{person.fullName}</h2>
        </div>
      )}
    </div>
  );
};
export default PersonProfile;
