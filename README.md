使用taro+react+typescript+redux+tard搭建微信小程序、h5模版；包括多包场景、图片使用iconfont等

---
highlight: a11y-dark
---
## 一、目录结构

分包

**预定大于配置**

## 二、环境变量

在开发中，通常有**多套环境**去配置不同的环境变量

> 方案：将变量写在 `.env.{NODE_ENV}` 文件中，利用 [cross-env](https://www.npmjs.com/package/cross-env) 注入环境标识，[dotenv-flow](https://www.npmjs.com/package/dotenv-flow) 将 `.env.{NODE_ENV}` 文件加载到 `process.env`，最后将 `process.env` 写入 `taro` 配置文件，环境变量统一用 `APP_` 开头
### 1、将变量写在 `.env.{NODE_ENV}` 文件
模版仓库里面，以有`开发-dev`、`预发-pre`、`生产-prod`、`测试-test`为例，分别对应文件`.env`、`.env.pre`、`.env.prod`、`.env.test`
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63d8e2f4187d4c30bbccb08db0152cc3~tplv-k3u1fbpfcp-watermark.image?)

### 2、利用 [cross-env](https://www.npmjs.com/package/cross-env) 注入环境标识
组合`环境(dev/pre/prod/test) * 类型(dev/build) * 平台(小程序/H5)` 比较多...但是比手动在命令行输入变量强
```json
// package.json
"scripts": {
    "build:weapp": "taro build --type weapp",
    "build:h5": "taro build --type h5",
    "dev:weapp": "npm run build:weapp -- --watch",
    "dev:h5": "npm run build:h5 -- --watch",
    "build-pre:weapp": "cross-env APP_ENV=pre taro build --type weapp",
    "build-pre:h5": "cross-env APP_ENV=pre taro build --type h5",
    "dev-pre:weapp": "cross-env APP_ENV=pre npm run build:weapp -- --watch",
    "dev-pre:h5": "cross-env APP_ENV=pre npm run build:h5 -- --watch",
    "build-test:weapp": "cross-env APP_ENV=test taro build --type weapp",
    "build-test:h5": "cross-env APP_ENV=test taro build --type h5",
    "dev-test:weapp": "cross-env APP_ENV=test npm run build:weapp -- --watch",
    "dev-test:h5": "cross-env APP_ENV=test npm run build:h5 -- --watch",
    "build-prod:weapp": "cross-env APP_ENV=prod taro build --type weapp",
    "build-prod:h5": "cross-env APP_ENV=prod taro build --type h5",
    "dev-prod:weapp": "cross-env APP_ENV=prod npm run build:weapp -- --watch",
    "dev-prod:h5": "cross-env APP_ENV=prod npm run build:h5 -- --watch"
}
```

### 3、利用[dotenv-flow](https://www.npmjs.com/package/dotenv-flow) 将 `.env.{NODE_ENV}` 文件加载到 `process.env`并写入taro配置文件
默认注入`dev`标识，起h5 dev服务执行`yarn dev:h5`即可
```js
// config/dev.js ｜ config/prod.js
process.env.APP_ENV = process.env.APP_ENV || 'dev'

require('dotenv-flow').config({
  // node_dev表示.env.{node_env}文件
  node_env: process.env.APP_ENV
})

module.exports = {
  env: {
    APP_VERSION: process.env.npm_package_version,
    APP_ENV: process.env.APP_ENV,
    APP_API: process.env.APP_API
  }
};
```

## 三、图片处理
> 方案，小图标用 `iconfont`，借助 [taro-iconfont-cli](https://www.npmjs.com/package/taro-iconfont-cli) 这个包将图片处理成 `svg`；大图标用`CDN`

### 1、小图标
（1）安装taro-iconfont-cli
```bash
npm i taro-iconfont-cli -D
```
（2）初始化配置文件

```bash
npx iconfont-init
```
可以看到根目录生成了配置文件`iconfont.json`，具体参数说明可查看[taro-iconfont-cli](https://www.npmjs.com/package/taro-iconfont-cli)官网
```json
{
    // 直接复制[iconfont](http://iconfont.cn/)官网提供的项目链接
    "symbol_url": "http://at.alicdn.com/t/font_1373348_kk9y3jk2omq.js",
    // 根据iconfont图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。
    "save_dir": "./src/assets/iconfont",
    // 如果您的项目使用Typescript编写，请设置为true。这个选项将决定生成的图标组件是`.tsx`还是`.js`后缀。
    "use_typescript": true,
    // 选择需要支持的平台，默认是`*`，意味着所有平台都需要支持（如果有）。如果你只想支持部分平台，也可以设置成数组：
    "platforms": ["weapp", "h5"],
    // 是否使用[尺寸单位rpx]还是普通的像素单位`px`。默认值为true，与Taro保持一致的缩放。您也可以设置为false，强制使用`px`
    "use_rpx": true,
    "trim_icon_prefix": "icon",
    "default_icon_size": 18,
    "design_width": 750
}
```
（3）生成Taro标准组件
执行`yarn icon`
```json
// package.json
"scripts": {
    "icon": "npx iconfont-taro"
}
```
（4）使用图标
```js
//xx.tsx
import { resolve } from 'path';
<IconFont name='user' size={40} color="#333" />
```
> 图标多了，会出现图片体积增大的问题，如果你的项目体积非常紧张（小程序体积有要求），没有多余的体积给图标，可以考虑 `字体图标`，直接使用字体图标的话可能会对首屏时间有一点影响，如果关注这个的话，可以直接使用 `CDN`
### 2、大图标
就比较简单了，将CDN前缀抽离为常量 `CDN_IMG` 写在 `constants` 文件夹下，使用时，拼接图片地址
```js
// src/constants/index.ts
export const CDN_IMG = 'https://www.baidu.com/img/'
```

```js
// xx.tsx
import { Image } from "@tarojs/components";
import { CDN_IMG } from "@/constants";

<Image src={`${CDN_IMG}PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png`} />
```

## 四、网络请求封装
> 方案：基于API [Taro.request](https://nervjs.github.io/taro/docs/apis/network/request/request/) 封装，`H5`携带`cookie`配置`credentials=include`，小程序封装实现`类似H5`cookie`通用方案`

```js
// 

```
`微信小程序cookies`
https://juejin.cn/post/6844904045920911374#heading-25

## 五、样式(适配)处理

#### 1、确定设计稿尺寸

-   Taro 默认以 `750px` 作为换算尺寸标准；如果设计搞的尺寸不是750，可通过 `designWidth`配置
-   默认支持 `750`、 `640` 、 `828` 三种尺寸设计稿；如果需要支持自定义设计稿，可通过 ` deviceRatio  `自定义；比如`'375':2/1`

```js
// config/index.js
const config = {
  ...
  // 设计稿尺寸
  designWidth: 750,
  // 设计稿尺寸换算规则
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    350: 2 / 1
  },
  ...
}
```

#### 2、外联样式写法

-   根据设计搞 `1:1` 直接写`px`、或者`%`即可，Taro默认会对所有的单位进行转换；当转成`微信小程序`的时候，尺寸将默认转换为 `rpx`，当转成 `H5` 时将默认转换为以 `rem` 为单位的值
-   不希望被转换的单位，在 px 单位中增加一个大写字母，例如 `Px` 或者 `PX` ，还有一些其他方案，不过不常用，具体可见[官网](https://taro-docs.jd.com/taro/docs/size)

<!---->

-   配置 `1px` 不转换，通过配置 `onePxTransform` 字段为 `false`，如下

```js
// config/index.js
const config = {
  ...
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true
      },
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: false // H5配置 1px 不需要被转换
        }
      }
    }
  },
  ...
}
```

#### 3、内联样式写法

在编译时，Taro 会帮你对样式做尺寸转换操作，但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 `Taro.pxTransform` 来做运行时的尺寸转换

建议统一抽离到 `utils` 里面

#### 4、1px问题

产生原因


### 三、图片
