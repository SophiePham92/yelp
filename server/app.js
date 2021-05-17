require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/users');
const db = require('./db')

const app = express();

// 1. Set up middleware
app.use(morgan('dev'));
app.use(express.json()); 

app.get('/api/v1/restaurants', async (req,res) => {
    const {rows} = await db.query(`select * from restaurants`);
    res.status(200).json({
        message: "success",
        results: rows.length,
        data: {
            restaurants: rows
        }
    })
})

app.post('/api/v1/restaurants', async(req,res) => {
    const {name, location, price_range} = req.body;
    const {rows} = await db.query(`insert into restaurants(name, location, price_range) values($1, $2, $3) returning *`, [name, location, price_range])
    res.status(201).json({
        message: "success",
        params: req.params,
        data: {
            restaurant: rows[0]
        }
    })
})

app.get('/api/v1/restaurants/:id', async (req,res,next) => {
    const restaurantId = req.params.id;
    const {rows} = await db.query(`select * from restaurants where id = $1`, [restaurantId]);
    res.status(200).json({
        message: "success",
        params: req.params,
        data: {
            restaurant: rows[0]
        }
    })
})

app.put('/api/v1/restaurants/:id', (req,res,next) => {
    // const restaurantId = req.params.id;
    // const {name, location, price_range} = req.body;
    // const {rows} = db.query(`update restaurants set ${name ? `name = $1`: ``}`)
    // res.status(200).json({
    //     message: "success",
    //     params: req.params,
    //     data: {
    //         restaurant
    //     }
    // })
})

app.delete('/api/v1/restaurants/:id', async (req,res) => {
    const restaurantId = req.params.id
    const {rows} = await db.query(`delete from restaurants where id = $1 returning *`, [restaurantId])
    res.status(200).json({
        message: "success",
        params: req.params,
        data: {
            restaurant: rows[0]
        }
    })
})



const port = process.env.PORT || 3020
app.listen(port, () => {
    console.log('App is running on port ' + port)
})


var restaurantsData = [
    {id: 1, name: "Spring", location: "Hanoi", price_range: 3},
    {id: 2, name: "Winter", location: "Saigon", price_range: 4}
]
