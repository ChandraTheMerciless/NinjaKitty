var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './build/game.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        // Nice colored output
        colors: true
    },
    plugins: [
        new CopyWebpackPlugin([
            {
             from: 'node_modules/phaser/build/phaser.js',
             to: 'build/'
            },
            {
             from: 'node_modules/phaser/build/phaser.min.js',
             to: 'build/'
            },
            {
             from: 'node_modules/phaser/build/phaser.map',
             to: 'build/'
            },



            // {
            //     from: 'phaser-ce/phaser.js',
            //     to: 'build/'
            // },
            // {
            //     from: 'phaser-ce/phaser.min.js',
            //     to: 'build/'
            // },
            // {
            //     from: 'phaser-ce/phaser.map',
            //     to: 'build/'
            // },




            // {
            //     from: 'assets/Font/Bubblegum.ttf',
            //     to: 'build/font/'
            // },
            // {
            //     from: 'styles/styles.css',
            //     to: 'build/'
            // }
        ], {
            ignore: [],
            copyUnmodified: true
        })
    ]
};
