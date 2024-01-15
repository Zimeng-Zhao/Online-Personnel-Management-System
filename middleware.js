/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

export let logRequest = (async (req, res, next) => {
    console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${req.user ? 'Authenticated User' : 'Non-Authenticated User'})`
  );

  if (req.session.user) {
    if (req.session.user.role === "admin" && req.originalUrl !== "/admin") {
        if (req.originalUrl !== "/logout" && req.originalUrl !== "/protected") {
            return res.redirect("/admin");
        }
    } else if (req.session.user.role === "user" && req.originalUrl !== "/protected") {
        if (req.originalUrl !== "/logout") {
            return res.redirect("/protected");
        }
    }
}
    next();
});

export let direction = (async (req, res, next) => {
    if(req.session.user){
        if(req.session.user.role === "admin"){
            return res.redirect('/admin');
        }else if(req.session.user.role === "user"){
            return res.redirect('/protected');
        }else{
            return res.redirect('/login');
        }
    }
    next();       
}
);



export let registerRoute = (async (req, res, next) =>{
    if(req.session.user){
        if(req.session.user.role === "admin"){
            return res.redirect('/admin');
        }
        if(req.session.user.role === "user"){
            return res.redirect('/protected');
        }        
    }
    else{
        // return res.redirect('/login');
    }
    next();
});

export let protectedRoute = (async (req, res, next) =>{
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
});

export let adminRoute = (async (req, res, next) =>{
    if(!req.session.user){
        return res.redirect('/login');
    }else{
        if(req.session.user.role != "admin"){
            res.status(403).render('error', { message: 'You do not have permission to view this page.', status: 403, });
        }else{
            next();
        }
    }
});