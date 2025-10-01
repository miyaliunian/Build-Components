/*
 * @Author: 逗逗飞 wufei@strongdata.com.cn
 * @Date: 2025-10-01 17:32:17
 * @LastEditors: 逗逗飞 wufei@strongdata.com.cn
 * @LastEditTime: 2025-10-01 17:34:13
 * @FilePath: /build-compons/packages/common-assets/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 公共资源入口文件
// 用于导出资源路径，方便其他包引用

module.exports = {
  // 图片资源路径
  images: {
    // 示例: logo: require('./images/logo.png')
  },

  // 字体资源路径
  fonts: {
    // 示例: roboto: './fonts/Roboto-Regular.ttf'
  },

  // 获取图片路径的辅助函数
  getImagePath: (name) => {
    return `@build-compons/common-assets/images/${name}`;
  },

  // 获取字体路径的辅助函数
  getFontPath: (name) => {
    return `@build-compons/common-assets/fonts/${name}`;
  },
};
