const HandlebarsPlugin = require('handlebars-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path');
module.exports = {
    entry: './app/js/index.js',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(?:js|jsx|mjs|cjs|tsx|ts)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-typescript"]
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                },
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },

        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'clientlibs/[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
            }
        }
    },
    plugins: [
        new ESLintPlugin({
            context: './',
            overrideConfigFile: 'eslint.config.js',
            exclude: [`/node_modules/`],
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), "app", "views", "pages", "*.hbs"),
            output: path.join(process.cwd(), "dist", "[name].html"),
            partials: [path.join(process.cwd(), "app", "views", "layout", "*.hbs")],
            data: {
                home: {
                    title: 'Home Page',
                },
                about: {
                    title: 'About'
                }
            }
        })],
    mode: 'production',
    devServer: {
        static: './dist',
        watchFiles: ["app/views/**/*.hbs"],
    },

};