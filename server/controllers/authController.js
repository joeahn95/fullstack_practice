const authController = {
  checkSession: async (req, res, next) => {
    const cookie = req.cookies.token;

    if (cookie !== 'admin') {
        console.log('no session found, redirecting to login...');
        res.status(200).redirect('/');
    }

    return next();
  },
}

module.exports = authController;