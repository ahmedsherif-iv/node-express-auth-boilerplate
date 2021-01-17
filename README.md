# REST API Node.js Server Boilerplate

A boilerplate/template project for quickly building REST APIs using Node.js, Express, Mongoose, and Passport.

You will get a production-ready Node.js app fully configured. The app comes with many built-in features, such as authentication using JWT, Facebook, Google auth, request validation. For more details, check the features list below.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/ahmedsherif-iv/node-express-auth-boilerplate.git
cd node-express-boilerplate
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
touch .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Mailer Service](#mailer-service)
- [Validation and Authentication middlewares](#validation)



## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
PORT=5000

# mongoDB
MONGO_URI='mongodb uri'
MONGO_DB_NAME='db name'

# jwt 
JWT_SECRET='your jwt secret'
JWT_EMAIL_SECRET='your jwt email secret'
JWT_MAX_AGE='1d' # or set it as you want

# Google auth
GOOGLE_CLIENT_ID='your google client id'
GOOGLE_CLIENT_SECRET='your google client secret'

# Facebook auth
FACEBOOK_APP_ID='your facebook app id'
FACEBOOK_APP_SECRET='your facebook app secret'

# Mailer
EMAIL_USER = 'your email for sending emails to your users'
EMAIL_PASSWORD = 'your email password'
EMAIL_SERVICE= 'email service name'
```

## Project Structure

```
config\         # Environment variables and passport configuration
controllers\    # Route controllers (controller layer)
middlewares\    # Custom express middlewares
models\         # Mongoose models (data access layer)
routes\         # Routes
services\       # Business logic (service layer)
validations\    # Request data validation schemas
templates\      # Email templates 
public\         # Public directory
|--images\      # Images for email templates
app.js          # Express app
```


## Commands

Running in production:

```bash
npm start
```

Running locally:

```bash
npm run dev
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/auth/register` - Register new user\
`POST /api/auth/login` - Auth user & get token\
`POST /api/auth/password-reset/get-code` - Reset password of user\
`POST /api/auth/password-reset/verify` - Verify and save new password of user\
`GET /api/auth/google` - Login with google\
`POST /v1/auth/facebook` - Login with facebook\
`GET /api/auth/google/callback` - Callback route for google auth to redirect to\
`GET /api/auth/facebook/callback` - Callback route for facebook auth to redirect to

**User routes**:\
`POST /api/users` - Create a user (requires admin access)\
`GET /api/users` - Get all users (requires admin access)\
`GET /api/users/:id` - Get a user by id (requires admin access)\
`PUT /api/users/:id` - Update a user (requires admin access)\
`DELETE /api/users/:id` - Delete a user (requires admin access)\
`GET /api/profile` - Get profile data\
`PUT /api/profile` - Get update profile data\
`GET /api/users/get-activation-email` - Resend confirmation email\
`GET /api/users/confirmation/:token` - Confirm user's email\


## Mailer Service

You can send emails to users with sendMail function that takes the data and the custom template name
which is available in `templtaes` directory using [ejs](https://ejs.co/).

for adding more email templates don't forget to define it in getAttachments() function.


## Validation and Authentication middlewares

Request data is validated using [Celebrate](https://github.com/arb/celebrate). Check their github [readme](github.com/arb/celebrate#readme) for more details on how to write Celebrate validation schemas.

The validation schemas are defined in the `validations` directory and are used in the routes by providing them as parameters to the `celebrate` middleware.

```javascript
const { Router } = require('express');
const { userController } = require('../controllers');
const { celebrate } = require('celebrate');
const { opts, userValidation } = require('../validations');
const { authMiddleWare } = require('../middlewares');

const router = express.Router();

router.route('/').post([
        requireAuth,
        isAdmin,
        celebrate(userValidation.registerSchema, opts)
    ], userController.createUser);
```

I wrote handleValidationError() as the error handler middleware for custom celebrate error messaging better than the format of the default errors() middlware

## License

[MIT](LICENSE)