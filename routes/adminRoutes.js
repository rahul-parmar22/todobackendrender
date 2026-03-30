import { Router } from "express"
import getAllusers from "../controller/adminController.js";


const router = Router(); 

router.get('/', getAllusers)

export default router; 