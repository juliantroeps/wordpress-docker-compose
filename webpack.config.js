const path = require('path');

const webpack                   = require('webpack');
const UglifyJSPlugin            = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const TerserPlugin              = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                = require('copy-webpack-plugin');

module.exports = function(env) {
    const mode = env.NODE_ENV || 'development';
    const extensionPrefix = mode === 'production' ? '' : '';
    const showMaps = mode === 'development';

    // Optimizations
    let opti = {};

    if(mode === 'production') {
        opti = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: showMaps,
                    terserOptions: {}
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: showMaps
                        }
                    }
                }),
                new UglifyJSPlugin({
                    test: /\.js(\?.*)?$/i,
                    sourceMap: true,
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        output: {
                            comments: false,
                        },
                    },
                })
            ]
        }
    } else {
        opti = {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: showMaps,
                    terserOptions: {}
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: showMaps
                        }
                    }
                })
            ]
        }
    }

    // This is the URL path relative to the root domain.
    const publicPath = 'www/wp-content/themes/THEME_NAME/';

    // These are the paths where different types of resources should end up.
    const paths = {
        theme: './www/wp-content/themes/THEME_NAME/',
        css: 'assets/dist/css/',
        img: 'assets/dist/img/',
        font: 'assets/dist/fonts/',
        js: 'assets/dist/js/',
        lang: 'lang/',
        theme_alt: path.resolve(__dirname, publicPath),
    };

    // The property names will be the file names, the values are the files that should be included.
    const entry = {
        app: [
            paths.theme + 'assets/src/js/app.js',
            paths.theme + 'assets/src/css/app.scss',
        ],
        editor: paths.theme + 'assets/src/css/editor.scss',
        admin: paths.theme + 'assets/src/css/admin.scss',
    };

    const config = {
        mode,
        entry,
        output: {
            path: path.resolve(__dirname),
            publicPath,
            filename: `${ paths.theme }${ paths.js }[name]${ extensionPrefix }.js`,
        },
        plugins: [
            new CopyPlugin([
                { from: paths.theme_alt + '/assets/src/img/', to: paths.theme_alt + '/assets/dist/img/' },
            ]),
            new CleanWebpackPlugin({
                dry: true,
                cleanOnceBeforeBuildPatterns: [],
                verbose: true
            }),
            new MiniCssExtractPlugin({
                filename: paths.theme + 'assets/dist/css/[name].css'
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],
        module: {
            rules: [
                // perform js babelization on all .js files
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['babel-preset-env']
                        }
                    }
                },
                // compile all .scss files to plain old css
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: showMaps
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: showMaps,
                            },
                        },
                    ]
                },
                // Compile Fonts
                {
                    test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                regExp: /\/fonts\$/i,
                                outputPath: publicPath + paths.font,
                                publicPath: '../fonts/'
                            }
                        }
                    ]
                },
                {
                    test:  /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                regExp: /\/img\$/i,
                                outputPath: publicPath + paths.img,
                                publicPath: '../img/'
                            }
                        }
                    ]
                }
            ]
        },
        optimization: opti
    };

    if (mode !== 'production') {
        console.log('Creating source-maps.');
        config.devtool = 'cheap-module-source-map';
    } else {
        console.log('Skipping source-maps.');
        config.devtool = 'none';
    }

    return config;
};
