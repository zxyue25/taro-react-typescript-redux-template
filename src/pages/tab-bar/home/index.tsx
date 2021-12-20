import React from "react";
import { View } from "@tarojs/components";
import IconFont from '../../../assets/iconfont'
import './index.less'

const Home = () => {

  return (
    <View className='wrapper'>
      首页
      <IconFont name='user' size={40} color={['red', 'green']} />
    </View>
  );
};

export default Home;
