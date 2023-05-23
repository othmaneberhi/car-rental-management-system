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
        // Check if id is a number
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"Invalid id parameter"
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
    try{
        const rentals = await Rental.findAll({where:{status:'pending'}})
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                rentals:rentals
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

exports.findCompletedRentals = async (req,res)=>{
    try{
        const rentals = await Rental.findAll({where:{status:'completed'}})
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                rentals:rentals
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

exports.addRental = async (req,res)=>{

}

exports.setStatus = async (req,res)=>{
    try{

        const id = req.params.id
        const status = req.query.status
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no rental id provided"
                }
            })
        }
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"Invalid id parameter"
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

        if(!status){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no status query provided"
                }
            })
        }
        if (status !== 'pending' && status !== 'completed') {
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:'Invalid status value'
                }
            });
        }

        rental.status = status
        await rental.save()
        return res.status(200).json({
            status:200,
            success:true,
            message:"Rental's status updated successfully",
            data:{
                status:rental.status,
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