import jwt from 'jsonwebtoken';

export function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, acceso denegado.' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: 'Token no válido.' });
  }
}

export function authenticateSocket(socket, next) {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error('No token');
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new Error('No autorizado'));
  }
}
