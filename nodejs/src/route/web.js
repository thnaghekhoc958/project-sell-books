import express from "express"
import homeController from"../controller/User/homeController";
import userController from"../controller/User/userController";
import usersAdjustMentController from"../controller/User/getAllController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/1',homeController.getAboutHome);
    router.get('/create-account',homeController.getCreateAccount);
    router.post('/input-data',homeController.postCrud);
    router.get('/require-data',homeController.displayUser);
    router.get('/edit-data',homeController.getRepairData);
    router.post('/put-crud',homeController.getUpdateData);
    router.get('/delete-crud',homeController.getDeleteDisplay);

    //////api////////

    router.post('/api/login',userController.handleLogin);
    ///////api-reactJS///////
    router.get('/api/get-all-users',usersAdjustMentController.handleGetAllUsers);
    router.put('/api/edit-all-data',usersAdjustMentController.handleGetAllEditUsers);
    router.post('/api/create-new-users',usersAdjustMentController.handleCreateUsers);
    router.delete('/api/delete-all-data',usersAdjustMentController.handleDeleteUsers);
    
    return app.use("/",router);
}
module.exports = initWebRoutes;