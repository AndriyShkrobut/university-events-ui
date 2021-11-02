module.exports = {
    presets: [["@babel/preset-env", {
        useBuiltIns: "entry",
        corejs: 3
    }], "@babel/preset-react", "@babel/preset-typescript"],
    plugins: [["@babel/transform-runtime", {regenerator: true, corejs: 3}]]
}