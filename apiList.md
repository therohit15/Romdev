# Romdev Apis

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/requestId
- POST /request/review/rejected/requestId

## userRouter
- GET /request/recieves
- GET /connections
- GET /feed 

Status: ignored, interested, accepted, rejected