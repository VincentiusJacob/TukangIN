
import React, { useState } from 'react';
import './ChooseRole.css';
import Logo from '../assets/tukangin.png';
import { FaHardHat, FaUserFriends } from 'react-icons/fa';
import type { IconBaseProps } from 'react-icons';

const ChooseRole: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      console.log(`Selected Role: ${selectedRole}`);
      // navigate to registration page or store role
    }
  };

  return (
    <div className="choose-role-container">
      <header className="role-header">
        <div className="logo-wrapper">
          <img src={Logo} alt="Logo" className="role-logo" />
          <span className="brand-text">
            Tukang<span className="brand-highlight">IN</span>
          </span>
        </div>
      </header>

      <h2 className="choose-title">Choose your Role</h2>

      <div className="roles">
        <div
          className={`role-option ${selectedRole === 'tukang' ? 'selected' : ''}`}
          onClick={() => handleSelect('tukang')}
        >
          <FaHardHat {...({ className: 'role-icon' } as IconBaseProps)} />
          <span className="role-label">Tukang</span>
        </div>

        <div
          className={`role-option ${selectedRole === 'customer' ? 'selected' : ''}`}
          onClick={() => handleSelect('customer')}
        >
          <FaUserFriends {...({ className: 'role-icon' } as IconBaseProps)} />
          <span className="role-label">Customer</span>
        </div>
      </div>

      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default ChooseRole;


