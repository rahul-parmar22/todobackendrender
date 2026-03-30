import  express from 'express'; 
import { login, register } from '../controller/userController.js';
const router = express.Router();   //express.Router() Create modular route handlers // jo apne andar routes define kar sakta hai

router.post('/register', register);
router.post('/login', login); 

export default router; 