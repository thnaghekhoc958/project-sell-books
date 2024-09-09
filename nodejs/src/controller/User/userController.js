import newUserServices from "../../services/UserService/newUsersServicee"
let handleLogin = async(req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    // console.log(req.body)
    console.log('your email: ' + email)
    console.log('your password: ' + password)

    if(!email || !password){
        return res.status(500).json({
            errcode: 1,
            errMessage: 'missing input a parameter!',
            test: 'test'
        })
    }
    // let userData = await newUserServices.handleUserLogin(email,password);
    let userdata = await newUserServices.handleUserLogin(email,password);
    // let checkpassword = await newUserServices.hashUserPassword(password);
    // let userdata = await newUserServices.checkUserData(email,password);
    // console.log('day la mat khau duoc nhap vao tu nguoi dung can kiem xem co khop voi mat khau trong database ko')
    // console.log(checkpassword)

    // if(userdata.errcode == 1){
    //     return res.status(500).json({
    //         errcode : userdata.errcode,
    //         errMessage : userdata.message,
    //         userdata
    //     })
    // }
    // if(userdata.errcode == 2){
    //     return res.status(500).json({
    //         errcode : userdata.errcode,
    //         errMessage : userdata.message,
    //         userdata
    //     })
    // }
    // if(userdata.errcode == 3){
    //     return res.status(500).json({
    //         errcode : userdata.errcode,
    //         errMessage : userdata.message,
    //         userdata
    //     })
    // }

    return res.status(200).json({
        errcode : userdata.errcode,
        errMessage : userdata.message,
        userdata
        // user : userdata.user ? userdata.user : {'error' : 'data no found!'}
    })
}


module.exports = {
    handleLogin : handleLogin,
}