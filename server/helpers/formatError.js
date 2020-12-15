

function formatErrors(err) {
    
    let error = {};
    Object.keys(err.errors).forEach( (key) => {
        error[key] = err.errors[key].message;
    });

    return error;
}

module.exports = {
    formatErrors
}