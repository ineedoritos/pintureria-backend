import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import jwt from 'jsonwebtoken';
import {RolesType } from '../utils/constants';

// Extendemos la interfaz de Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: number;
        email: string;
        role: RolesType
        iat: number;
        exp: number;
      };
    }
  }
}   

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token faltante o formato incorrecto' });
  }

  const token = authHeader.slice(7); // Quita "Bearer "

  try {
    const payload = authService.verifyToken(token) as jwt.JwtPayload;

    if (!payload || typeof payload !== 'object' || !payload.sub || !payload.email || !payload.role) {
      return res.status(401).json({ error: 'Token mal formado' });
    }

    req.user = {
      sub: Number(payload.sub),
      email: payload.email as string,
      role: payload.role as RolesType,
      iat: payload.iat as number,
      exp: payload.exp as number
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
