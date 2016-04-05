var array = [];

/**
 * Index Action
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    var person = {fname:"John", lname:"Doe", age:25};

    var x;
    for (x in person) {
        addToArray(person);
    }

    console.log(array);

    var returnResponseOfFileJson = function (content) {
        res.json(content);
    };

    var returnError = function () {
        res.status('ERROR', 500);
    };

    fs.readFileAsync('test.json')
        .then(logLib.logContent)
        .then(JSON.parse)
        .catch(logLib.throwError)
        .done(returnResponseOfFileJson, returnError)
    ;

    console.log('autre chose');
};

function addToArray(person) {
    array.push(person);
    console.log(array);
}