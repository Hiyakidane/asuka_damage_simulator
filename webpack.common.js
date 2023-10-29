module.exports = {
    entry: `./src/index.tsx`,

    output: {
        path: `${__dirname}/dist`,
        filename: "main.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                test: /\.jsx$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/react"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/, 
            },
            {
                test: /\.ts$/,
                test: /\.tsx$/,
                use: [
                    {loader: "ts-loader"}
                ],
                exclude: /node_modules/, 
            },
            {
                test: /\.css$/i,
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