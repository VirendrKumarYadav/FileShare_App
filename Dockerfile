# node version 20

FROM  node:hydrogen-slim
FROM  mongo-express:latest

# create new folder 
WORKDIR /fileshare_App

# copy all data from current working directory to app folder

COPY  . /fileshare_App

# #npm i

Run npm i

# node index.js

CMD [ "node","index.js" ]


# docker build cmd
# docker build -t fileshareapp:1.0.0 .