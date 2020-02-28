const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin }  = require('webpack-bundle-analyzer');
const autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
    const config = {}

    if(!isDev) {
        config.minimizer = [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const babelOptions = preset => {
    const opt = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    }

    if(preset) {
        opt.presets.push(preset)
    }

    return opt
}

const plugins = () => {
    const base = [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'docs')
            }
        ]),
        new HtmlWebPackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ]

    if(!isDev) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: [
        '@babel/polyfill',
        './index.js',
    ],

    output: {
        path: path.resolve(__dirname, './docs'),
        filename: filename('js')
    },

    devServer: {
        port: 8181
    },

    optimization: optimization(),

    devtool: isDev ? false : false,

    module: {
        rules:[
            //javascript
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions()
                },
            },
            //typescript
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                },
            },
            //react jsx
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                },
            },
            //styles
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ]
                        }
                    },
                    'sass-loader'
                ],
            },
            //images
            {
				test: /\.(png|jpg|jpeg|svg|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
                            name: './img/[name].[ext]'
						}
					}
				]
            },
            //fonts
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './fonts/[name].[hash].[ext]'
                        }
                    }
                ]
            },
        ]
    },

    plugins: plugins(),
}