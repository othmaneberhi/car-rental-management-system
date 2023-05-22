const {Car} = require('../models')
const { Op } = require('sequelize');

exports.findAllCars = async (req,res) =>{
    try{
        const query = req.query.q
        const column = req.query.column
        const validColumns = await Car.describe()
        let cars;
        if(query && column){
            if(Object.keys(validColumns).includes(column)){
                cars = await Car.findAll({
                    where: {
                        [column]: {
                            [Op.like]: `%${query}%`
                        }
                    }
                })
            }
            else {
                return res.status(400).json({
                    success:false,
                    message: "the query column is not valid"
                })
            }
        }
        else{
            cars = await Car.findAll();
        }
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