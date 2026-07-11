const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.flash('error', 'You must be logged in to view that page.');
    res.redirect('/login');
};

const requireRole = (...allowedRoles) => {
    return (req,res,next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to view that page.');
            return res.redirect('/login');
        }

        if (!allowedRoles.includes(req.session.user.role)) {
            req.flash('error', 'You do not have permission to access that page');
            return res.redirect('/');
        }

        next();
    };
}

export { requireLogin, requireRole };