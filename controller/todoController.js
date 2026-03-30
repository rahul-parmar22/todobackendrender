

import Todo from "../models/Todo.js"; //aa req.user, req.params, req.bdoy  ne e badha ne destructure karvama  khub khyal rakhvo

const getTodos = async (req, res) => {
  try {
const  page = Number(req.query.page) ||1;
const limit = Number(req.query.limit) ||5;
const skip =  (page-1)*limit
const {status, sort, search, find}  = req.query;

const filter = {user:req.user }; //filter ek object chhe ane niche alag alag filter aa obj ma add thata jay ane aa final obj find ma pass kari devano

if(status === "completed") filter.completed = true;    // filter.completed= true means filter obj je creatre karyo tema new key value add karo {user:req.user, complete:true} aavu bane filter ma em
if(status === "pending") filter.completed = false; 
 //if(sort === 'newest')  filter.createdAt = -1 ;   aavu no thay karan ke Tum createdAt ko filter ke andar daal rahe ho, jabki sorting filter ka part hoti hi nahi ❌// mongodb ma find(filter) → sirf match karta hai// sort() → order decide karta hai //  jo aavu karo ane query ma niche sort no lagavo only a filter basis par karo to mongodb samje ke  “createdAt field ka value -1 hona chahiye” 
//console.log(filter);  ✅✅✅//price low to high ke high to low aa j khali sort thi thai..baki max, min , above, below price aa badhu filter thi thay...ane hamesha yad rakhvu ke je fitler vadha vastu par lagavvanu hoy tena par indexing lagavvi to easily handle thay...like 1 lakh product hoy ane badha par fitler lagava besvi to time jay mate indexing best ... price field par indexing lagavvu schema ma..

if(search) filter.todo = {$regex: search, $options:"i" }
if(find) filter.todo = {$regex: find, $options:"i"}
let sortOption = sort==='oldest'? {createdAt:1} : {createdAt:-1}
//console.log(sortOption); 

//console.log(filter); 
console.log(filter);

    const user = req.user;
        console.log(req.user); 
           
    const todos = await Todo.find(filter).sort(sortOption).skip(skip).limit(limit);  
    const total = await Todo.countDocuments(filter); 
   
    res.status(200).json({ todos, message: "sucessfully getTodos...!", user,pages: Math.ceil(total/limit) });
  } catch (err) {         
    res.json(err.msg);
  }
};

const addTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const newTodo = new Todo({ todo, user: req.user });
    await newTodo.save();
    res.status(200).json({ newTodo, messsage: "Todo created successfully..!" });
  } catch (err) {
    res.json(err.msg);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params; 
        const { updatedText, completed } = req.body;
            const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { todo: updatedText, completed },
      { new: true },
    );
    res
      .status(200)
      .json({ updatedTodo, message: "todo update successfully..!" });
  } catch (err) {
    res.json(err.msg);
  }
};


const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id }); //jya jya pan await use karvi means e ek promise return kare cheh ke hu aa task kari nakhish ane mate aapane wait karie chheie to ahi aa  deletedTodo ma ek promise j return thatu hoy
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.json(err.msg);
  }
};

export { getTodos, addTodo, deleteTodo, updateTodo };

