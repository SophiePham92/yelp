require('dotenv').config();
const express = require('express');
const morgan = require('morgan')

const app = express();

// 1. Set up middleware
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/v1/restaurants', (req,res,next) => {
    res.status(200).json({
        message: "success",
        data: {
            restaurants: restaurantsData
        }
    })
})

app.post('/api/v1/restaurants', (req,res,next) => {
    const newRestaurant = req.body;
    restaurantsData.push(newRestaurant)
    res.status(201).json({
        message: "success",
        params: req.params,
        data: {
            restaurants: restaurantsData
        }
    })
})

app.get('/api/v1/restaurants/:id', (req,res,next) => {
    const restaurantId = req.params.id
    const restaurant = restaurantsData.find(restaurant => restaurant.id == restaurantId);
    res.status(200).json({
        message: "success",
        params: req.params,
        data: {
            restaurant
        }
    })
})

app.put('/api/v1/restaurants/:id', (req,res,next) => {
    const restaurantId = req.params.id
    const modifiedRestaurantData = req.body
    let restaurant = restaurantsData.find(restaurant => restaurant.id == restaurantId);
    Object.assign(restaurant, modifiedRestaurantData)
    res.status(200).json({
        message: "success",
        params: req.params,
        data: {
            restaurant
        }
    })
})

app.delete('/api/v1/restaurants/:id', (req,res) => {
    const restaurantId = req.params.id
    restaurantsData = restaurantsData.filter(restaurant => restaurant.id != restaurantId);
    res.status(200).json({
        message: "success",
        params: req.params
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
