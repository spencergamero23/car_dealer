const addLocalVariables = (req,res,next) => {
    res.locals.isLoggedIn = !!(req.session && req.session.user);
    next();
};

export {addLocalVariables};