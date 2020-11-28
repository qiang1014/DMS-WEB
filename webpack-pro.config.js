const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

process.env.NODE_ENV = "production";  //设置node的环境变量，处理css样式兼容性问题

module.exports = {
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
     //js兼容性处理  如IE浏览器不能识别es语法：const、箭头函数等，babel-loader  @babel/preset-env
    rules: [
      {
       // 对".js"或".jsx"结尾的文件使用babel-loader进行转译
       // babel-loader的配置放到".babelrc"文件内
        test: /\.jsx?$/,
        exclude: /(node_modules)/,  
        use: "babel-loader"
      },
      {
        // 对css文件先后使用css-loader和style-loader
        // css-loader可以将导入项目的css变为js模块
        // style-loader可以让页面打开时，利用js将css模块内的样式注入到html头部的style标签内,执行顺序：从右到左
        test: /\.css$/,
        use: [
          //"style-loader", 
          MiniCssExtractPlugin.loader,  //使用插件将css样式单独处理
          "css-loader",

          //css兼容性处理：postcss:postcss-loader post-preset-env
          //帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
          {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugin: () => [
                  require("postcss-preset-env")()
                ]
            }
          }

          //压缩css样式：optimize-css-assets-webpack-plugin
        ]
      },
      {
        // 对less文件先后使用less-loader、css-loader和style-loader,需要下载less和less-loader依赖
        // css-loader可以将导入项目的css变为js模块
        // style-loader可以让页面打开时，利用js将css模块内的样式注入到html头部的style标签内,执行顺序：从右到左
        test: /\.less$/,
        use: [
          //"style-loader", 
           MiniCssExtractPlugin.loader,  //使用插件将css样式单独处理
          "css-loader",
          "less-loader"
        ]
      },
       
      
      // {
      //   test: /\.jsx$/,
      //   loader: "babel-loader",
      //   options: {
      //     preset: ['@babel/preset-env']
      //   }

      // },


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
        template: './src/index.html',   //复制index.html模板文件，并将打包的js文件自动引入

        //html代码压缩
        minify: {
          //移除空格
            collapseWhitespace: true,
            //移除注释
            removeComments: true
        }
    }),

    new MiniCssExtractPlugin({
        filename: 'css/main.css'
    }),

    new optimizeCssAssetsWebpackPlugin(),  //压缩css文件 使的css文件变成一行，体积小，加载速度快

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