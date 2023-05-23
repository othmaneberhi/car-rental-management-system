const {User, Account, Rental, Car} = require('../models')
const { Op } = require('sequelize');

exports.findAllUsers = async (req,res) =>{
    try{
        const query = req.query.q
        let users =[];
        if(query){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^06\d{8}$/;
            if(emailRegex.test(query)){
                users = await User.findAll({
                    include:{
                        model:Account,
                        attributes:[],
                        where:{
                            isAdmin:false,
                        }
                    },
                        where: {
                            email: { [Op.like]: `%${query}%`}
                        },
                    order: [['id', 'DESC']],
                    }
                )
            }
            else if(phoneRegex.test(query)){
                users = await User.findAll({
                    include:{
                        model:Account,
                        attributes:[],
                        where:{
                            isAdmin:false,
                        }
                    },
                        where: {
                            phone: { [Op.like]: `%${query}%`}
                        },
                    order: [['id', 'DESC']],
                    }
                )
            }
            else{
                users = await User.findAll({
                    include:{
                        model:Account,
                        attributes:[],
                        where:{
                            isAdmin:false,
                        }
                    },
                        where: {
                            [Op.or]:[
                                { first_name: { [Op.like]: `%${query}%` } },
                                { last_name: { [Op.like]: `%${query}%` } },
                            ]
                        },
                    order: [['id', 'DESC']],
                    }
                )
            }


        }
        else{
            users = await User.findAll({
                include:{
                    model:Account,
                    attributes:[],
                    where:{
                        isAdmin:false,
                    }
                },
                order: [['id', 'DESC']],
            });
        }
        return res.status(200).json({
            status:200,
            data:{
                users:users
            },
            message: "Users retrieved successfully",
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

exports.findUserById = async (req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no user id provided"
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
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'User not found'
                }
            })
        }
        return res.status(200).json({
            status:200,
            success:true,
            data:{
                user:user,
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

exports.deleteUser = async (req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no user id provided"
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
        let user = await User.findByPk(id,{
            include: [
                {
                    model: Account,
                    as: 'Account',
                    attributes: ['id'],
                },
                {
                    model: Rental,
                    as: 'Rentals',
                    attributes: ['id'],
                },
            ],
        });
        if(!user){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'User not found'
                }
            })
        }

        await Rental.destroy({where:{
                user_id:user.id
            }})
        await Account.destroy({where:{
                user_id:user.id
            }})
        user = await user.destroy();

        return res.status(200).json({
            status:200,
            success:true,
            message:"User and associated rentals deleted successfully",
            data:{
                user:user,
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

exports.findUserRents = async (req,res) =>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no user id provided"
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
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'User not found'
                }
            })
        }

        const rentals = await Rental.findAll({
            where: { user_id: id },
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

exports.updateUser = async (req,res) => {
    try{
        const id = req.params.id
        const newUser = req.body;
        if(!id){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"no user id provided"
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
        if(!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.address || !newUser.phone){
            return res.status(400).json({
                status:400,
                success:false,
                error:{
                    message:"please provide all required fields"
                }
            })
        }

        let user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                status:404,
                success:false,
                error:{
                    message:'User not found'
                }
            })
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({
            paranoid: false,
            where: { email:newUser.email }
        });
        if (existingUser && existingUser.id!==user.id ) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }


        user.first_name = newUser.first_name;
        user.last_name = newUser.last_name;
        user.address = newUser.address;
        user.email = newUser.email;
        user.phone = newUser.phone;

        user = await user.save();

        return res.status(201).json({
            status:201,
            success:true,
            data:{
                user:user
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