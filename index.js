//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import Router from "./auth_routes.js";

const constructorMethod = (app) => {
    app.use('/', Router);
    app.use('*', (req,res) =>{
        res.status(404).json({error: 'Route Not found'});
    });
}

export default constructorMethod;