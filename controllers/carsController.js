const {Car,Rental,User} = require('../models')
const { Op } = require('sequelize');

exports.findAllCars = async (req,res) =>{
    try{
        const query = req.query.q
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        let cars =[];
        if(minPrice && maxPrice && query){
            if(isNaN(maxPrice) || isNaN(minPrice)){
                return res.status(400).json({
                    error:{
                        status:400,
                        success:false,
                        error:{
                            message:'invalid prices format (expected: Number)'
                        }
                    },
                    success:false,
                })
            }

            if (parseInt(minPrice)  > parseInt(maxPrice)) {
                return res.status(400).json({
                    status:400,
                    success:false,
                    error:{
                        message: 'Min price should be less than max price'
                    },
                });
            }
            cars = await Car.findAll({
                    where: {
                        [Op.and]:[
                            { [Op.or]:[
                                    { brand: { [Op.like]: `%${query}%` } },
                                    { model: { [Op.like]: `%${query}%` } },
                                    { color: { [Op.like]: `%${query}%` } },
                                    { price: { [Op.like]: `%${query}%` } },
                                    { year: { [Op.like]: `%${query}%` } },

                                ]
                            },
                            { price:{[Op.between]: [minPrice,maxPrice]}}
                        ]

                    },
                order: [['id', 'DESC']],
                }
            )
        }
        else if(minPrice && maxPrice){
            if(isNaN(maxPrice) || isNaN(minPrice)){
                return res.status(400).json({
                    error:{
                        status:400,
                        success:false,
                        error:{
                            message:'invalid prices format (expected: Number)'
                        }
                    },
                    success:false,
                })
            }

            if (parseInt(minPrice)  > parseInt(maxPrice)){
                return res.status(400).json({
                    status:400,
                    success:false,
                    error:{
                        message: 'Min price should be less than max price'
                    },
                });
            }

            cars = await Car.findAll({
                    where: {
                        price:{[Op.between]: [minPrice,maxPrice]}
                    },
                order: [['id', 'DESC']],
                }
            )


        }
        else if(query){
            cars = await Car.findAll({
                    where: {
                        [Op.or]:[
                            { brand: { [Op.like]: `%${query}%` } },
                            { model: { [Op.like]: `%${query}%` } },
                            { color: { [Op.like]: `%${query}%` } },
                            { price: { [Op.like]: `%${query}%` } },
                            { year: { [Op.like]: `%${query}%` } },
                        ]
                    },
                order: [['id', 'DESC']],
                }
            )
        }


        else{
            cars = await Car.findAll({ order: [['id', 'DESC']],});
        }

        return res.status(200).json({
            status:200,
            data:{
                cars:cars
            },
            message: "Cars retrieved successfully",
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
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                car:car,
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

exports.findAvailableCars = async (req,res)=>{
    try{
        const cars = await Car.findAll({where:{status:1}})
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                cars:cars
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

exports.findRentedCars = async (req,res) => {
    try{
        const cars = await Car.findAll({where:{status:0}})
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                cars:cars
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

exports.addCar = async (req,res) => {
    try{
        let car = req.body;
        if(!car.brand || !car.model || !car.year || !car.color || !car.price || !req.body.hasOwnProperty('status') || !(typeof car.status === 'boolean')){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"please provide all required fields"
                }
            })
        }
        car = await Car.create(car)
        return res.status(201).json({
            status:201,
            success:true,
            data:{
                car:car
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

exports.updateCar = async (req,res) => {
    try{
        const id = req.params.id
        const newCar = req.body;
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no car id provided"
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
        if(!newCar.brand || !newCar.model || !newCar.year || !newCar.color || !newCar.price || !req.body.hasOwnProperty('status') || !(typeof newCar.status === 'boolean')){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"please provide all required fields"
                }
            })
        }

        let car = await Car.findByPk(id);
        if(!car){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'Car not found'
                }
            })
        }

        car.brand = newCar.brand;
        car.model = newCar.model;
        car.year = newCar.year;
        car.color = newCar.color;
        car.status = newCar.status;
        car.price = newCar.price;

        car = await car.save();

        return res.status(201).json({
            status:201,
            success:true,
            data:{
                car:car
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

exports.deleteCar = async (req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no car id provided"
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
        let car = await Car.findByPk(id,{
            include:Rental,
        });
        if(!car){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'Car not found'
                }
            })
        }
        await Rental.destroy({where:{
            car_id:car.id
            }})
        car = await car.destroy();

        return res.status(200).json({
            status:200,
            success:true,
            message:"Car and associated rentals deleted successfully",
            data:{
                rentals:car.Rental,
                car:car,
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

exports.setCarStatus = async (req,res)=>{
    try{

        const id = req.params.id
        const available = req.query.available
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no car id provided"
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

        if(!available){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no status query provided"
                }
            })
        }
        if (available !== '0' && available !== '1') {
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:'Invalid availability value'
                }
            });
        }

        car.status = Boolean(Number(available));
        await car.save()
        return res.status(200).json({
            status:200,
            success:true,
            message:"Car availability updated successfully",
            data:{
                available:car.status,
                car:car,
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

exports.findCarRents = async (req,res) =>{
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

        const rentals = await Rental.findAll({
            where: { car_id: id },
            include: [
                {
                    model: Car,
                    as: 'Car',
                    attributes: ['id', 'brand'],
                },
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name'],
                },
            ],
        });


        return res.status(200).json({
            status:200,
            success:true,
            data:{
                rentals:rentals,
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