exports.index = function (req, res) {

    var returnResponse = function (obj) {
        //Retour json
        //res.json(obj);
        //Retour devue sans layout par defaut
        //res.render('users', {users: obj, layout: false});
        res.render('users', {users: obj});
    };

    //models.User.findAsync()
    //
    //Pour trier et limiter models.User.find().sort({name:1}).limit(2).execAsync()
    //Pour selectionner que certains champs models.User.find().sort({name:1}).select('name age').execAsync()
    //Esxclure un champ (-lenomduchamp) models.User.find().sort({name:1}).select('-name').execAsync()
    models.User.find().sort({name:1}).select('-_id').execAsync()
        .then(logLib.logContent)
        .then(returnResponse)
    ;

};

exports.one = function (req, res) {

    var returnResponse = function (obj) {
        //res.json(obj);
        res.render('user', {user: obj});
    };

    //req.params.name recupère le paramètre
    var options = {name: req.params.name};

    //findOne en non promisifiy ajouter Async avec Promisify de bluebird
    models.User.findOneAsync(options)
        .then(logLib.logContent)
        .then(returnResponse)
    ;
};

exports.create = function (req, res) {
    var returnResponse = function (obj) {
        res.json(obj);
    };

    models.User(req.body).saveAsync()
        .then(logLib.logContent)
        .then(returnResponse);
};

/**
 * Update user by id
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
    var returnResponse = function (obj) {
        res.json(obj);
    };

    var options = {_id: req.body._id};

    var returnUpdatedObject = function () {
        models.User.findOneAsync(options)
            .then(logLib.logContent)
            .then(returnResponse)
        ;
    };

    //l'id étant unique et ne doit pas être maj, il doit être supprimer du req.body
    delete req.body['_id'];

    models.User.findOneAndUpdateAsync(options, req.body)
        .then(returnUpdatedObject)
    ;
};

/**
 * Delete User By _id
 *
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
    var returnResponse = function () {
        res.json({message: 'Tout est ok'});
    };

    //Si le retour est une erreur avec un statut
    var returnError = function () {
        res.status(500).json({message: 'PROBLEME'});
    };

    var options = {_id: req.params.id};

    models.User.findOneAndRemoveAsync(options)
        .catch(logLib.throwError)
        .done(returnResponse, returnError)
    ;
};