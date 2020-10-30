//Port

process.env.PORT = process.env.PORT || 3000;

//Environment
process.env.ENV = process.env.ENV || 'dev';


//DB
let urlDB;
const dbName = 'toll_motor_way';

if(process.env.ENV === 'dev'){
    urlDB = `mongodb://localhost:27017/${dbName}`;
}else{
    //Falta esto
}

process.env.URL_DB = urlDB;