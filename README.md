# School API

## Run locally
1. Copy `.env.example` to `.env` and fill values.
2. Install:
   npm install
3. Start:
   npm run dev   # for development
   npm start     # for production

## Endpoints
- POST /addSchool  (body: name, address, latitude, longitude)
- GET  /schools
- GET  /listSchools?latitude=<>&longitude=<>[&radius=<>]

## Database
Run `create_table.sql` on your MySQL to create the schema.
