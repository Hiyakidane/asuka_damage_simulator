module.exports = {
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
                        loader: "ts-loader"
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