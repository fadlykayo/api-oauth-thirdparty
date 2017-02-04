# api-oauth-thirdparty

# Information

Using passport strategy to authenticate in local app

# Usage

npm install
npm run dev

## Routes

| Routes               | HTTP   | Description                                |
|----------------------|--------|--------------------------------------------|
| /api/get             | GET    | Get all users data                         |
| /api/:id             | DELETE | Delete user by id                          |
| /api/:id             | PUT    | Update user by id                          |
| /api/signin          | POST   | Login through app using manual jwtwebtoken |
| /api/signup          | POST   | Register in app                            |
| /auth/twitter/login  | GET    | Login through twitter passport api         |
| /auth/facebook/login | GET    | Login through facebook passport api        |
| /auth/google/login   | GET    | Login through google passport api          |
