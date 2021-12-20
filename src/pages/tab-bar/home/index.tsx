import React from "react";
import { View, Image } from "@tarojs/components";
import IconFont from '@/assets/iconfont'
import { CDN_IMG } from "@/constants";
import './index.less'

const Home = () => {

  return (
    <View className='wrapper'>
      使用图标
      <IconFont name='user' size={40} color="#333" />

      使用图片
      <Image src={`${CDN_IMG}PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png`} />
    </View>
  );
};

export default Home;
