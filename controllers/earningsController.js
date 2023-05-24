const {Car,Rental,User} = require('../models')
const {Op,fn,col} = require("sequelize");


earningsSum = (pricePerDay,startDate,endDate) => {
    const timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return pricePerDay*diffDays
}

exports.getEarnings = async (req,res) => {
    try{
        const start_date= req.query.start_date
        const end_date= req.query.end_date
        let earnings=0;
        if(start_date && end_date){
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if(!regex.test(start_date) || !regex.test(end_date)){
                return res.status(400).json({
                    error:{
                        status:400,
                        message:"invalid date format (expected: yyy-mm-dd)"
                    },
                    success:false,
                })
            }

            const rentals = await Rental.findAll({
                include: [{
                    model: Car,
                    attributes:['price'],
                    as:'Car'
                }],
                where: {
                    [Op.and]:[
                        {status: 'completed'},
                        {
                            start_date: {
                                [Op.between]: [start_date, end_date]
                            },
                            end_date: {
                                [Op.between]: [start_date, end_date]
                            },
                        }
                    ]
                },
            })

            rentals.forEach(rental=>{
                earnings+=earningsSum(rental.Car.price,rental.start_date,rental.end_date)
            })

            return res.status(200).json({
                status:200,
                data:{
                    totalEarnings:earnings,

                },
                message: "Rentals earnings between the two dates retrieved successfully",
                success:true,
            })
        }
        const rentals = await Rental.findAll({
            include: [{
                model: Car,
                attributes:['price'],
                as:'Car'
            }],
            where: {
                status: 'completed'
            },
        })

        rentals.forEach(rental=>{
            earnings+=earningsSum(rental.Car.price,rental.start_date,rental.end_date)
        })

        return res.status(200).json({
            status:200,
            data:{
                totalEarnings:earnings,

            },
            message: "Rentals earnings retrieved successfully",
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