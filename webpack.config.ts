import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables): webpack.Configuration => {
  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.module\.scss$/,
          use: [
            env.mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]__[hash:base64:5]",
                },
                esModule: true,
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              targets: "defaults",
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        // {
        //   test: /\.tsx?$/,
        //   use: "ts-loader",
        //   exclude: /node_modules/,
        // },
        // {
        //   test: /\.scss$/,
        //   exclude: /\.module\.scss$/,
        //   use: [
        //     "style-loader",
        //     "css-modules-typescript-loader",
        //     "css-loader",
        //     "sass-loader",
        //   ],
        // },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
    },
    devtool: "inline-source-map",
    devServer: {
      port: env.port ?? 3000,
      open: true,
    },
  };
};
