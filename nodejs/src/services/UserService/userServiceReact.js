// import bcrypt from "bcrypt";
import db from "../../models";
import argon2 from "argon2";
import { where } from "sequelize";
import { raw } from "body-parser";
import { rejects } from "assert";
import { error } from "console";

let getAllOfUsers = (userId) => {
    return new Promise(async(resolve,reject) =>{
        try {
            let users = '';
            if(userId == 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    },
                })
            }
            // console.log(userId)
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id : userId},
                    attributes:{
                        exclude:['password']
                    },
                })

            }
            console.log(users)
            // delete users.password;
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getEditData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errcode:1,
                    message:"mising required parameter"
                })
            }
            let user = await db.User.findOne({
                where: {id : data.id},
                raw: false,

              })
              
              if (user){
                user.name = data.name;
                user.address = data.address;
                user.roleId = data.gender;
                // console.log('---------------------')
                // console.log(user.address)
                // console.log(user.gender)
                // console.log(user)
                // await db.user.save({
                //     name : data.name,
                //     address : data.address,
                //     roleId : data.gender
                // });
                // resolve({
                //     errcode:0,
                //     message:"update success"
                // });
              }else{
                resolve({
                    errcode:1,
                    message:"user not found!"
                });
              }
               await db.User.update({
        
               })
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser =(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkemailofusers(data.email)
            if(check){
                resolve({
                    errcode: 1,
                    message: 'your email was already use, please! you have to switch to other email '
                })
            }
            let hashPassWordFromargon2 = await hashUserPassword(data.password);
            await db.User.create({
              name: data.name,
              email: data.email,
              phonenumber: data.phonenumber,
              address: data.address,
              password: hashPassWordFromargon2,
              gender: data.gender.toString() === "1" ? 'MALE' : 'FEMALE',  // Chuyển đổi thành chuỗi
              roleId: data.role_id.toString() === "1" ? 'ADMIN' : 'USER',
              // gender: data.gender === "1" ? true : false,
              // roleId: data.role_id === "1" ? true : false,
            });
            resolve("created a new data user");
            resolve({
                errcode:0,
                message: 'Ok',
            })
        } catch (error) {
            reject(error)
        }
    })
}

let checkemailofusers = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: {email: email}
            })
            if (user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
         reject(error)   
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const hashPassWord = await argon2.hash(password)
        console.log("Hashed Password:", hashPassWord); // In ra giá trị hash
        resolve(hashPassWord);
      } catch (error) {
        reject(error);
      }
    });
  };

  let deleteUsers = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
         let user = db.User.findOne({
            where: {id: id}
            })
         if(user){
            await db.User.destroy({
                where: {id:id}
            })
            // await user.destroy();
            resolve({
                errcode: 0,
                message: "the user is deleted"
            })
         }else{   
            resolve({
                errcode: 1,
                message: "user not exist"
            })
         }   
        } catch (error) {
            reject(error)
        }
    })
  }


module.exports = {
getAllOfUsers:getAllOfUsers,
getEditData:getEditData,
createNewUser:createNewUser,
deleteUsers:deleteUsers
}