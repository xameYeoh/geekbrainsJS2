module.exports = {
    entry: './script',
    output: {
        filename: './build.js'
    },
    watch: true,
    watchOptions: {
        ignored: '**/node_modules',
    },
}