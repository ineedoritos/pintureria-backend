import { Request, Response } from 'express'; 
import { authService } from '../services/auth.service'; 

export const authController = {
  
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;  

    try {
      const result = await authService.login(email, password); 

      if (result.success) {
        
        return res.status(200).json({ token: result.token });
      }


      return res.status(401).json({ message: result.message });

    } catch (error) {

      return res.status(500).json({ message: "Error en el proceso de autenticación" });
    }
  },


  verifyToken: (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];  
    
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      const decoded = authService.verifyToken(token);  // Verificamos el token usando el servicio
      return res.status(200).json({ decoded });  
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
};
