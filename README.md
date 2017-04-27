## 项目概览
链接：

基本需求：


## 环境搭建

- 使用`Vue-cli`脚手架工具搭建，基于`webpack`模板集成各种开发工具，非常方便。如：
  - `postcss`: vue-loader自动增加的依赖，只需关注css代码，不需考虑加各种厂商的前缀，因为postcss在编译时会自动加上
  - `eslint`: 语法校验工具，统一代码风格，编写出更加优雅、可读性更强的代码
  - `base64`: 将png等格式图片自动转换为base64格式的，再也不用将多张小图片集合成一张雪碧图了，减少了切图的工作量
  - 如果不想将png图片转换为base64，将图片资源放在src同级目录下的static目录下即可，编译时会将static目录拷贝到dist/static目录的

- 使用`normalize.css`作为项目基础的css

- 使用`stylus`预处理器语言，为css赋予动态语言的特性。定义常用的样式和mixins，就可以在样式中贯穿使用了

- 使用`vue-router`来创建单页面应用，只需要配置组件和路由映射，然后告诉vue-router在哪里渲染它们就行了

- 使用`vue-axios`来处理ajax请求，接收后台返回的数据，然后渲染页面

- 使用`better scroll`实现商品页左右两侧联合滚动：https://github.com/ustbhuangyi/better-scroll


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:5000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## 涉及的技术
- Vue.js框架的使用，包括它的属性和方法、各种API、生命周期等
- Webpack编译文件的配置，如编译的路径、编译文件的命名、css文件的提取、是否生成map文件等


## 遇到的困难和解决方法

