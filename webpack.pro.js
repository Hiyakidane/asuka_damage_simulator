//const { merge } = require('webpack-merge')
//const common = require('./webpack.common.js')

module.exports = {
    mode: "production",

    entry: `./src/index.tsx`,

    output: {
        path: `${__dirname}/docs`,
        filename: "main.js"
    },

    module: {
        rules: [
            {
                test: /\.ts$|\.tsx$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.build.json",
                        }
                    }
                ],
                exclude: ['/node_modules/'], 
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ]   
    },

    target: ["web", "es5"],

    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules'],
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    }
}