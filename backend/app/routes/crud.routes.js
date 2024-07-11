const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");


module.exports = function(app) {
    //app.post('/posts/create', controller.createPost);
  
app.post('/api/posts/create',[authJwt.verifyToken], controller.createPost);

app.get('/api/posts', controller.getPost);

app.get('/api/posts/:id',controller.findSinglePost);

app.put('/api/posts/:id',controller.updatePost);

app.delete('/api/posts/:id', controller.deletePost);
}


