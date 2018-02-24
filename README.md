## RESTFUL API

Belajar restful api dengan teknologi Javascript NODEJS, EXPRESS, dan MONGODB

### RUNNING

* clone `https://github.com/ekoteguhw/belajar-restful-api-javascript.git`
* `npm install` to install dependencies
* `npm start` in production
* `npm run dev` in development

### DEPENDENCIES

* body-parser
* comperssion
* dotenv
* express
* express-validation
* helmet
* joi
* mongoose
* validator
* morgan
* nodemon
* bcrypt
* http-status
* jsonwebtoken
* passport
* passport-local
* passport-jwt
* mongoose-unique-validator
* slug

### API routes

* /users
  * [POST] /users/sign_up
  * [POST] /users/sign_in
* /posts
  * [POST] /posts/create
  * [PATCH] /posts/:id
  * [DELETE] /posts/:id
  * [GET] /posts
  * [GET] /posts/:id
  * [POST] /posts/:id/favorite
