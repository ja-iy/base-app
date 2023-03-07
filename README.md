## Base APP 

A structured template for a fullstack web app
    - features: typesafe, auth, ORM, monorepo.
    - deployment types: serverless ( recomended ), docker, server.


## Stack

    typescript + zod                type safety
    react + react query             component templating
    tailwind css + sass             styling

    next js                         server
    tRPC                            api
    next auth                       authentication & authorization
    prisma + mysql                  ORM / dB


## Steps

    1. create a .env file in the root folder ( based on the .env.example )

    2. run npm install

    3. local dev 
        ? npx prisma migrate dev + npm run db-seed  
        : npx prisma generate

    4. npm run dev

    