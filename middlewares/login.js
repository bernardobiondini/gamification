const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    }

}

module.exports = login;