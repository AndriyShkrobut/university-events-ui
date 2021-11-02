const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const sourcePath = path.resolve(__dirname, "src")
const publicPath = path.resolve(__dirname, "public");
const buildPath = path.resolve(__dirname, "build");

module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv.development;
    const isEnvProduction = webpackEnv.production;

    const config = {
        mode: isEnvDevelopment ? "development" : "production",
        entry: {
            index: path.join(sourcePath, "index.tsx")
        },
        output: {
            path: buildPath,
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction ? "[name].[contenthash:8].js" : "index.js",
            chunkFilename: isEnvProduction ? "[name].[contenthash:8].chunk.js" : isEnvDevelopment && "[name].chunk.js",
            assetModuleFilename: "static/media/[name].[hash:8][ext]",
            clean: true,
        },
        bail: isEnvProduction,
        stats: "errors-warnings",
        optimization: {
            minimize: isEnvProduction,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.[tj]sx?$/,
                    use: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpe?g|gif|bmp)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024 // 10kb
                        }
                    }

                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf)$/,
                    type: "asset/inline",
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.join(publicPath, "index.html"),
                title: "University Events UI"
            }),
            new ForkTsCheckerWebpackPlugin({
                async: isEnvDevelopment,
                typescript: {
                    enabled: true,
                    configFile: path.resolve(__dirname, "tsconfig.json")
                }
            })
        ]
    }

    if (isEnvDevelopment) {
        config.devtool = "source-map";
        config.devServer = {
            client: {
                logging: "none",
                overlay: {
                    errors: true,
                    warnings: false
                }
            },
            static: {
                directory: publicPath
            },
            open: true,
            compress: true,
            port: 8000,
        }
    }

    return config;
};