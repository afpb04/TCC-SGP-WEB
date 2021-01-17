/* eslint-disable camelcase */
import React from 'react';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { HeaderComponet, HeaderContent, Profile } from './styles';

import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <HeaderComponet>
      <HeaderContent>
        <h1>
          <Link to="/dashboard">SGP</Link>
        </h1>

        <Profile>
          <img src={user.avatar_url} alt={user.name} />

          <div>
            <span>Bem-vindo</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </HeaderComponet>
  );
};
export default Header;
