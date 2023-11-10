const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        index: "./src/index.tsx"
    },
    mode: "production",
    module: {
        rules: [
            {
              test: /\.tsx?$/,
               use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }
                ],
               exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
                options: {
                    name: '/assets/icons/[name].[ext]'
                }
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader"
               ]
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: ".." },
                { from: "src/assets", to: "../assets"},
                { from: "src/background.js", to: ".."}
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
        clean: true,
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}