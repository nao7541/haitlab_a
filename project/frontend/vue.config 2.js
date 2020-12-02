module.exports = {
    outputDir: '../media',
    indexPath: '../templates/index.html',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/media/'
        : '/'
}