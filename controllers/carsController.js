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
        res.status(500).json({
            error:{
                status:500,
                code:error.code,
                message:error.message
            },
            success:false,
        })
    }
}

exports.findCarById = async (req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no car id provided"
                }
            })
        }
        const car = await Car.findByPk(id);
        if(!car){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'Car not found'
                }
            })
        }
        res.status(200).json({
            status:200,
            success:true,
            data:{
                car:car,
            }
        })

    }catch(error){
        res.status(500).json({
            status:500,
            success:false,
            error:{
                code:error.code,
                message:error.message
            },
        })
    }
}

exports.findAvailableCars = async (req,res)=>{
    try{
        const cars = await Car.findAll({where:{status:1}})
        res.status(200).json({
            status:200,
            success:true,
            data:{
                cars:cars
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:500,
            success:false,
            error:{
                code:error.code,
                message:error.message
            },
        })
    }
}

exports.findRentedCars = async (req,res) => {
    try{
        const cars = await Car.findAll({where:{status:0}})
        res.status(200).json({
            status:200,
            success:true,
            data:{
                cars:cars
            }
        })
    }catch(error){
        res.status(500).json({
            status:500,
            success:false,
            error:{
                code:error.code,
                message:error.message
            },
        })
    }
}

exports.addCar = async (req,res) => {
    try{
        let car = req.body;
        car = await Car.create(car)
        res.status(201).json({
            status:201,
            success:true,
            data:{
                car:car
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:500,
            success:false,
            error:{
                code:error.code,
                message:error.message
            },
        })
    }
}

