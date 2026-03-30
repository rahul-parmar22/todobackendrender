import express from "express"
const router = express.Router();
import { getTodos, addTodo, deleteTodo, updateTodo } from "../controller/todoController.js";  //ahi fiel name ma .js extentio lagavvu nahi to error aavashe

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id',deleteTodo);
router.put('/:id', updateTodo);  //aa badha backend na route chhe to aa badha upar url ma no hoy..ahi je :id chhe to e id url ma nahi show kare ..url ma upar dekhay e routes chhe ane backend ma aa badha chhe e api chhe..routes nu kam route pramane webpage dekhadvu ane api nu kam to kahbar j chhe
                                //aapane jyare aa kam karva je button hit karvi to te function ni andar aa api call thato hoy ane te api ma aapane aa dynamic params add karta hoie
export default router; 


