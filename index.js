const express = require('express')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/shoppingCart') 
const orderRouter = require('./routes/order');
const cors = require('cors');
require('./config/db');


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use('/images',express.static(__dirname+'/images'))

//Parse user's data -- Shakl ly hy3ml beh L logs
app.use(express.json());
//app.use(express.urlencoded());
app.use(cors());

//Middleware routes

app.use('/api/order',orderRouter)
app.use('/api/cart',cartRouter)
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)

//Catch all & Error handler 
app.use((req,res,next)=>{
    res.status(404).json({message:'route not found'})
})
 
app.use((err,req,res,next)=>{
    console.log("Error in ERROR MIDDLEWARE");
    res.status(500).json({message: 'something went wrong'})
})

//Server Listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})