// import newUserServices from "../../services/UserService/newUsersServicee"
import usersAdjustment from "../../services/UserService/userServiceReact"

let handleGetAllUsers = async(req,res) => {
    // console.log(req.body)
    let id = req.query.id;
    if(!id){
        return  res.status(200).json({
            errCode: 1,
            errMessage: 'mising required parameters',
            users: []
        })
    }
    let users = await usersAdjustment.getAllOfUsers(id);

    return  res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateUsers = async(req,res) => {
    let message = await usersAdjustment.createNewUser(req.body);
    console.log(message)
    return res.status(200).json(message)
}


let handleDeleteUsers = async(req,res) => {
    if(!req.body.id){
        return res.status(200).json({
            errcode:1,
            errMessage: "missing require parameter!"
        })
    }

    let message = await usersAdjustment.deleteUsers(req.body);
    console.log(message)
    return res.status(200).json({message})
}


let handleGetAllEditUsers = async(req,res) => {
    let data = req.body;
    let users = await usersAdjustment.getEditData(data)

    return  res.status(200).json(users)
}


module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleGetAllEditUsers: handleGetAllEditUsers,
    handleCreateUsers:handleCreateUsers,
    handleDeleteUsers:handleDeleteUsers,

}