const path = require('path');

module.exports = {
    configImport: function (_env = process.env.NODE_ENV, _path = process.cwd()) {

        //console.log(`[!!!] Process ENV <${_env}> >${process.env.NODE_ENV}< ${_path}`);
        _env = typeof _env !== 'undefined' ? _env : process.env.NODE_ENV;
        _path = typeof _path !== 'undefined' ? _path : process.cwd();
        //console.log(`[!!!] Process ENV <${_env}> >${process.env.NODE_ENV}< ${_path}`);
        
        let result = {};
        let key = 'dev';

        switch (_env) {
            case 'production':
            case 'prod':
                key = 'prod';
                break;
            case 'ropsten':
                key = 'ropsten';
                break;
            default:
                key = 'dev';
                break;
        }

        //console.log("IMPORT KEY", key, _env);

        result = require('dotenv').config({ path: path.resolve(_path, 'config', `.${key}.env`) });
        if (result.error) {
            throw result.error
        }

        var display = result.parsed;
        delete display.PRIVATE_KEY;
        delete display.MNEMONIC_PHRASE;
        console.log(display);

        console.log("[#] Process ENV", process.env.NODE_ENV);
        console.log("[#] ENV value from .env file:", process.env.ENV)

        return result;
    },
    getParentDir: function (_current, nest = 1) {

        var dir = _current.split('/');
        for (let i = 0; i < nest; i++)
            dir.pop();


        console.log("Returning", dir.join('/'))

        return dir.join('/');
    }
}


