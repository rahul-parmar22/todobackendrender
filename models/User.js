import mongoose, { Types } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
 username:{
        type:String,                         //badha validation forntnedma to rakhva j pan sathe  backendma pan em.. banne side rakhva...jo frontend ma j validation  required, minlength, maxlength,trim, lowercase, uppercase aa badhu nakhi dyo to kai validation fail thay to frontend thi j res ma error aavi jay wihtout calling server
        require:[true, "username is requierd"],  //aa je "username is..."  e jo username no nakhe to error aave karan ke requrie chhe aa field to tya error.message ma aa message aave....
        unique:true                             //  minlength: [2, "Name must be at least 2 characters"] aa pan aave validation ...jo minlegth 2 thi vadhi jay to error.message ma aa bajuno message aave
    },
    password:{
        type:String, 
        require:true, 
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user'
     }
});


//aa nicheno code jyare pan user save thay e pela chalshe....means register samye jyare user change karvi tyare chalshe...je user save thavano chhe te this ma aavashe...jo user pelathi save hashe to e pan this ma avashe..pan tyare e user aapane already exist chhe to jyare account khule user nu pachhi tema jaine change usrename ke change password karo etale tyare te user ne aapane exist chhe etale object id thi find karvi etale tyare te exist user aave ane tyare change karo password and save karo to ismodified true thai jay ane only username change karo to kai no thay 
userSchema.pre('save', async function(){  //normal function lakhvo padshe ..arrow fun ma this no chale
    if(this.isModified('password')) 
        this.password = await bcrypt.hash(this.password, 10);  //right side no this.password currently plain password chhe tema salt rounde nakhshe 10, jetalo moto number etalo vadhu secure password pan etalo j slow thay kam, bcrypt.hash password hash karshe and left side je this.password chhe e currently je password chhe eni hashed value banine store thay.means e hashed passwrod chhe je store thashe mongodb ma// bcrypt hash async fun chhe etale e thodo time le mate wait lagavvu ane password ek promise bani jay...   
}); 

userSchema.methods.compare = function(pw){  //khas yad rakhvu ke ahi password compare karti vakhte user pasethi je pw levi te plainpasswrod j verify vakhte pela nakvo ane second hashed password je already store hoy te nakvo..
    return bcrypt.compare(pw, this.password)   //ahi "this" use karva mate normal function vaparvo...arrwo fun ma this ahi hashe to no chale...
}            




export default mongoose.model('User', userSchema);
