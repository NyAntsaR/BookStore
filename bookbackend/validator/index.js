
exports.userSignupValidator = (req, res, next) => {

    // Avalaible on the express-validatore package
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")

        // RegEx to make sure that we have the @ on the email
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });

    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    
    const errors = req.validationErrors();

     // Map through each errors and return the first one
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    
    // Either success or fail, the app needs to move to the other phase otherwise the app will freeze
    next();
};