const express = require('express')//יבוא
const app = express()//מימוש שרת

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const env = require('dotenv')//- בקובץ env להשתמש במשתני מערכת  
env.config()//מימוש

const bodyParser = require('body-parser')//יבוא ספריה להמרה לגיסון את מה שמגיע מהקליינט
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
const cors = require('cors');
app.use(cors());

const morgan = require('morgan')
app.use(morgan('dev'))
const mongoose = require('mongoose')//התקנת ספריה להתחברות למונגו

//פונקציית ההתחברות לשרת
mongoose.connect(process.env.MONGO_CONNECTION
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log('Connected to MongoDB');

}).catch(err => { 'Error connecting to MongoDB:' + err })




// שימוש במידלוויר - כללי ללא הגבלת ניתוב
// app.use(mid1)

// כולל הגבלת ניתוב 
//app.use("/user",mid1)



//יבוא של הראוטרים שנוכל לשלוח אליהם
const userRouter = require('./routes/userRouter')
const vaccinationRouter = require('./routes/vaccinationRouter')
const manufacturerRouter = require('./routes/manufacturerRouter')


//middleWare -מטרתם הוא לעשות פעולות בין שליחת הבקשה לקבלת התשובה
//הפעלתם ע"י use

app.use('/user', userRouter)
app.use('/manufacturer', manufacturerRouter)
app.use('/vaccination', vaccinationRouter)




app.listen(3030, () => {
    console.log('listening- 3030');
})