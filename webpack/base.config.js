const Fiber = require('fibers');
const sass = require('sass');
const path = require('path');
const GetDeepEntries = require('./utils/GetDeepEntries');

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const scssEntries = new GetDeepEntries(path.resolve(__dirname, '../src/css'), ['scss','css']);
const jsEntries = new GetDeepEntries(path.resolve(__dirname, '../src/js'), ['js']);
const outputPath = path.resolve(__dirname, '../dist');

module.exports = {
    mode: 'development',
    entry: [
        ...scssEntries,
        ...jsEntries
    ],
    output: {
        path: outputPath
    },
    module: {
        rules: [
            {
                test: /.+(\.css|\.scss)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].css',
                            outputPath(fileName) {
                                return fileName.replace('src/', 'build/');
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                            fiber: Fiber
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                from: 'src',
                to: 'design-system',
                transformPath(targetPath) {
                    return targetPath.replace('css/', '');
                }
            }
        ])
    ]
};
