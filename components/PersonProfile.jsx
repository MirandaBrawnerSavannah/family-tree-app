import React from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import profileStyles from './PersonProfile.module.css';
import getUncertainDate from '../utils/getUncertainDate';
import Localizer, { getDateInfo } from '../utils/Localizer';


const PersonProfile = ({ person }) => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  const dateLocaleInfo = getDateInfo(locale);
  const birthDate = getUncertainDate(person.born);
  const formattedBirthDate = format(
    birthDate, 'PPP', { locale: dateLocaleInfo }
  );
  return (
    <div className={profileStyles.profile}>
      <h2 className={profileStyles.nameHeading}>{person.fullName}</h2>
      { birthDate && (
        <p>
          <span className={profileStyles.infoLabel}>
            {intl.formatMessage({ id: 'born' })}
          </span>
          {formattedBirthDate}
        </p>
      )}
    </div>
  );
};
export default PersonProfile;
