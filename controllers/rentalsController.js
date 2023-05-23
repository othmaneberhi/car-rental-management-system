const {Car,Rental,User} = require('../models')
const {Op} = require("sequelize");

exports.findAllRentals = async (req,res)=>{
    try{
        const query = req.query.q
        let rentals =[];
        if(query){
            rentals = await Rental.findAll({
                   include:[
                       {
                           model:Car,
                       },
                       {
                           model:User,
                       }
                   ],
                where:{
                       [Op.or]:[
                           { '$User.first_name$': { [Op.like]: `%${query}%` } },
                           { '$User.last_name$': { [Op.like]: `%${query}%` } },
                           {  '$Car.brand$': { [Op.like]: `%${query}%` } }
                       ]
                }
                }
            )
        }
        else{
            rentals = await Rental.findAll({
                include:[{
                    model:Car
                },
                    {
                        model:User
                    }
                ]
            });
        }
        return res.status(200).json({
            status:200,
            data:{
                rentals:rentals
            },
            message: "Rentals retrieved successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            error:{
                status:500,
                code:error.code,
                message:error.message
            },
            success:false,
        })
    }
}

exports.findRentalById = async (req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no rental id provided"
                }
            })
        }
        const rental = await Rental.findByPk(id);
        if(!rental){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'Rental not found'
                }
            })
        }
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                rental:rental,
            }
        })

    }catch(error){
        return res.status(500).json({
            status:500,
            success:false,
            error:{
                code:error.code,
                message:error.message
            },
        })
    }
}

exports.findPendingRentals = async (req,res)=>{

}

exports.findConfirmedRentals = async (req,res)=>{

}

exports.addRental = async (req,res)=>{

}

exports.setStatus = async (req,res)=>{

}