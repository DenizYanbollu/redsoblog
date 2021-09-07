const Validator = require("jsonschema").Validator
const { validate } = require('uuid');

Validator.prototype.customFormats.UUID = (input) => validate(input) === true

const v = new Validator()

const schemaTypes = {
    "getArticleByUUID": require("./schemas/getArticleByUUID.json"),
    "getArticleByTitle": require("./schemas/getArticleByTitle.json"),
    "submitArticle": require("./schemas/submitArticle.json"),
    "getAllArticles": require("./schemas/getAllArticles.json"),
    "getArticleBySlug": require("./schemas/getArticleBySlug.json"),
    "getUserByName": require("./schemas/getUserByName.json"),
    "getArticles": require("./schemas/getArticles.json")
}

function schemaValidator(input, schemaType) {
    if (schemaType || schemaTypes[schemaType]) {
       return v.validate(input, schemaTypes[schemaType]).valid 
    } else {
        return false
    }
}

module.exports = schemaValidator