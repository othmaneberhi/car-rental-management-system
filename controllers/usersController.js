const {User, Car} = require('../models')
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
                        where: {
                            email: { [Op.like]: `%${query}%`}
                        },
                    }
                )
            }
            if(phoneRegex.test(query)){
                users = await User.findAll({
                        where: {
                            phone: { [Op.like]: `%${query}%`}
                        },
                    }
                )
            }
            else{
                users = await User.findAll({
                        where: {
                            [Op.or]:[
                                { first_name: { [Op.like]: `%${query}%` } },
                                { last_name: { [Op.like]: `%${query}%` } },
                            ]
                        },
                    }
                )
            }


        }
        else{
            users = await User.findAll();
        }
        res.status(200).json({
            status:200,
            data:users,
            message: "Users retrieved successfully",
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
        res.status(200).json({
            status:200,
            success:true,
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
// exports.addUser = async (req,res) => {
//     try{
//         let user = req.body;
//         if(!user.first_name || !user.last_name || !user.email || !user.password || !user.phone || !user.status){
//             return res.status(400).json({
//                 status:400,
//                 success:false,
//                 error:{
//                     message:"please provide all required fields"
//                 }
//             })
//         }
//         user = await User.create(user)
//         res.status(201).json({
//             status:201,
//             success:true,
//             data:{
//                 car:user
//             }
//         })
//     }catch(error){
//         res.status(500).json({
//             status:500,
//             success:false,
//             error:{
//                 code:error.code,
//                 message:error.message
//             },
//         })
//     }
// }