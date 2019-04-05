import React from 'react';
import BaseIcon from 'app/components/icons/BaseIcon';

import logo from 'app/components/icons/IconLogoVk/logo-vk.svg';

const IconLogoVk = (props) => <BaseIcon
  icon={logo}
  {...props}
  className={`logo-vk logo-vk_active ${props.className}`}
/>;

export default IconLogoVk;
