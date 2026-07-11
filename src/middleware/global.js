const addLocalVariables = (req,res,next) => {
    res.locals.isLoggedIn = !!(req.session && req.session.user);
    res.locals.userRole = req.session && req.session.user ? req.session.user.role : null;
    next();
};

export {addLocalVariables};