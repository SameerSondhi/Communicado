const User = require('../controllers/user.controller');
    
//     app.post("/api/register", User.register);
//     app.post("/api/login", User.login);
//   // this route now has to be authenticated
//     app.get("/api/users", authenticate, User.getAll);
// }
module.exports = (app) => {
  app.post("/api/user", User.createNewUser);
  app.post('/api/login', User.login);
  app.get("/api/user", User.getAllUsers);
  app.get("/api/user/:id", User.getOneUser);
}
