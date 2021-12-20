/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import IconWechat from './IconWechat';
import IconAlipay from './IconAlipay';
import IconBaidu from './IconBaidu';
import IconLogout from './IconLogout';
import IconUser from './IconUser';
export { default as IconWechat } from './IconWechat';
export { default as IconAlipay } from './IconAlipay';
export { default as IconBaidu } from './IconBaidu';
export { default as IconLogout } from './IconLogout';
export { default as IconUser } from './IconUser';

export type IconNames = 'wechat' | 'alipay' | 'baidu' | 'logout' | 'user';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'wechat':
      return <IconWechat {...rest} />;
    case 'alipay':
      return <IconAlipay {...rest} />;
    case 'baidu':
      return <IconBaidu {...rest} />;
    case 'logout':
      return <IconLogout {...rest} />;
    case 'user':
      return <IconUser {...rest} />;

  }

  return null;
};

export default IconFont;
