const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 
module.exports = {
  // 设置为生产（production）模式
  // 生产模式默认会将js代码压缩
  // 如果你好奇打包后的文件长什么样
  // 可以将mode设置为"development"，将devtool设为"none"
  mode: "development",
  // 设置入口文件
  entry: "./src/index.jsx",
  output: {
    // 设置出口文件名
    filename: "main.js",
    // 设置出口文件的目录
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    // 设置扩展，这样导入文件时可以省去写扩展名
    extensions: [".js", ".json", ".jsx"]
  },

  //loader的使用：下载——>使用
  module: {
    rules: [
      {
       // 对".js"或".jsx"结尾的文件使用babel-loader进行转译
       // babel-loader的配置放到".babelrc"文件内
        test: /\.jsx?$/,
        use: "babel-loader"
      },
      {
        // 对css文件先后使用css-loader和style-loader
        // css-loader可以将导入项目的css变为js模块
        // style-loader可以让页面打开时，利用js将css模块内的样式注入到html头部的style标签内,执行顺序：从右到左
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // 对less文件先后使用less-loader、css-loader和style-loader,需要下载less和less-loader依赖
        // css-loader可以将导入项目的css变为js模块
        // style-loader可以让页面打开时，利用js将css模块内的样式注入到html头部的style标签内,执行顺序：从右到左
        test: /\.less$/,
        use: ["style-loader", "css-loader","less-loader"]
      },
      {
        // 使用file-loader来加载图片文件
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: "file-loader"
      }
    ]
  },

  //插件的使用顺序：下载——>引用——>使用    html-webpack-plugin
  plugins: [
    // 该插件能将生成的入口js文件注入到模板html内
    //new HtmlWebpackPlugin()

    //引入html模板
    new HtmlWebpackPlugin({
        template: './src/index.html'   //复制index.html模板文件，并将打包的js文件自动引入
    }) 
  ],


  //用来自动编译、自动打开浏览器、自动刷新浏览器，只会在内存中打包，不会有任何输出
  //webpack-dev-server
  devServer: {
      //运行项目的目录
      contentBase: path.resolve(__dirname, "dist"),

      //启动gzip压缩，代码小，运行快
      compress: true,

      port: 8090,

  }
};