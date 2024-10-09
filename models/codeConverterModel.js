// models/codeConverterModel.js

class CodeConverter {
    constructor(code, fromLanguage, toLanguage) {
        this.code = code;
        this.fromLanguage = fromLanguage;
        this.toLanguage = toLanguage;
    }
}

module.exports = CodeConverter;
