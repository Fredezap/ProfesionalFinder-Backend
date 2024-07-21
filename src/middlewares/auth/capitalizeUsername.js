// This middelweare capitalize every word contained in a string (Usefull for Full names.

function capitalizeUsername(req, res, next) {
    const usernameCapitalized = req.body.username.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
    req.body.username = usernameCapitalized
    next();
}

export default capitalizeUsername;