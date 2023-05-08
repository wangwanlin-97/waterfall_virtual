const path = require('path')
module.exports = {

    entry:'./index.ts',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'waterfall_virtual.js',
        library:'waterfall_virtual',
        libraryTarget:'umd'
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:['babel-loader','ts-loader'],
                exclude:/node_modules/
            }
        ]
    },
    mode:'production',
    resolve:{
        extensions:['.js','.ts','.json']
    }
}