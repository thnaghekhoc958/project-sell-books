import { where } from 'sequelize';
import bcrypt from "bcrypt";
import db from '../../models/index'
import argon2 from "argon2";

import { raw } from 'body-parser';
// "bcrypt": "^5.0.1",
// "bcryptjs": "^2.4.3",
let checkGmailUser =(email) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where : {email : email}
            })
            // console.log(user)
            // console.log(email)
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

// let handleUserLogin = (email, password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log(email);
//             console.log(password);
//             console.log('===================ở trên là input đầu vào của người dùng nhập vào!========');

//             let userData = {};
//             let isExist = await checkGmailUser(email);

//             if (isExist) {
//                 let user = await db.User.findOne({
//                     where: { email: email },
//                     attributes: ['email', 'roleId', 'password'],
//                     raw: true,
//                 });

//                 if (user) {
//                     console.log(user.password);

//                     // Sử dụng argon2 để so sánh mật khẩu
//                     let check = await argon2.verify(user.password, password);

//                     if (check) {
//                         userData.errcode = 0;
//                         userData.errMessage = `User found success!!!!`;
//                         delete user.password;
//                         userData.user = user;
//                     } else {
//                         userData.errcode = 1;
//                         userData.errMessage = `Wrong password`;
//                     }
//                 } else {
//                     userData.errcode = 1;
//                     userData.errMessage = `User not found! Please enter another email.`;
//                 }
//             } else {
//                 userData.errcode = 1;
//                 userData.errMessage = `Email not found! Please enter another email.`;
//             }
//             resolve(userData);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };



let handleUserLogin =(email,password) => {
    return new Promise(async(resolve,reject) => {
        try {
            console.log(email)
            console.log(password)
            console.log('===================ở trên là input đầu vào của người dùng nhập vào!========')
            let userData = {};
            let isExist = await checkGmailUser(email);
            // console.log('password',isExist.password)
            if (isExist) {
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes:['email','roleId','password'],
                    raw:true,
                })
                // console.log('password trong database:')
                // console.log(user.password)
                // console.log(user)
                if (user) {
                    console.log(user.password)
                    console.log()
                    // let check = await argon2.verify(user.password,password)
                    // const hashPassWord  = await hashUserPassword(user.password)
                    // let check = await bcrypt.compareSync(password,user.password);
                    // const storedHash = '$2b$10$QZeig4utpic8zpa0ADrhiOqAH...'; // hash này từ DB

                    // User input password
                    // const userInputPassword = 'yourPlainTextPassword';

                    // console.log("User Input Password:", userInputPassword);

                    // // Compare passwords
                    // const result = bcrypt.compareSync(userInputPassword, storedHash);
                    // console.log("Stored Hash:", storedHash);

                    // const newHash = bcrypt.hashSync(userInputPassword, bcrypt.genSalt(10));
                    // console.log("New Hash:", newHash);


                    // console.log("Does the password match?", result);
                    // console.log(check);
                    if (await argon2.verify(user.password,password)) {
                        userData.errcode = 0;
                        userData.errMessage = `User found success!!!!`
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errcode = 1;
                        userData.errMessage = `wrong password`;
                    }
                } else {
                    userData.errcode = 2;
                    userData.errMessage = `Your's User not Found!, plseas enter again orther!`
                }
            } else {
                userData.errcode = 3;
                userData.errMessage = `Your's Email not Found!, plesase enter again orther!`
            }
            resolve(userData)
         } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    });
  };



let checkUserData =(email,password) =>{
    return new Promise(async(resolve,reject) => {
        try {
            // let p = await bcrypt.hashSync(password,salt)
            // console.log('password da nhap:')
            // console.log(password)
            let userData = {};
            let user_email = await db.User.findOne({
                where: {email : email}
            })
            // console.log(user_email)
            console.log('password trong database:')
            console.log(user_email.password)
            if (user_email) {
                let isExistpassword = await bcrypt.compare(password,user_email.password)

                if (isExistpassword){
                    userData.errcode = 0
                    userData.message = `this user has been found!`
                    resolve(userData)  
                }else{
                    userData.errcode = 1
                    userData.message = `user(password) not found!`
                    resolve(userData)  
                }
            } else {
                userData.errcode = 1
                userData.message = `email not found!`
                resolve(userData)            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports ={
    handleUserLogin :handleUserLogin,
    checkUserData:checkUserData,
    hashUserPassword:hashUserPassword
}