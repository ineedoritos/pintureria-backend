import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token faltante' });
  }
  const token = authHeader.slice(7);
  try {
    const payload = authService.verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
