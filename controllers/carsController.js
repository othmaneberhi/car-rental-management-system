const {Car} = require('../models')

exports.findAllCars = async (req,res) =>{
    try{
        const cars = await Car.findAll();
        res.status(200).json({
            status:200,
            data:cars,
            message: "Cars retrieved successfully",
            success:true,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            error:{
                code:'INTERNAL_SERVER_ERROR',
                message:'An internal server error occurred'
            },
            success:false,
        })
    }
}