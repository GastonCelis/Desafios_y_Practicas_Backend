# Options to run
```
npm start FORK --> to run in FORK mode

npm start CLUSTER --> to run in CLUSTER mode

NPM start --> to run deafult (FORK mode)
```

# Options to run with nodemon
### FORK
```
cd src

nodemon server.js --> to run with nodemon (FORK mode)

tasklist --> to see the list of process
```

### CLUSTER
```
cd src

nodemon server.js CLUSTER --> to run with nodemon mode CLUSTER

tasklist --> to see the list of proccess
```

# Options to run with Forever
### FORK
```
cd src

forever -w server.js FORK --> FORK mode

forever list --> list of process with Forever

tasklist --> list of process with SO
```

### CLUSTER
```
cd src

forever -w server.js CLUSTER --> CLUSTER mode

forever list --> list of process with Forever

tasklist --> list of process with SO
```

# Options to run with PM2
```
cd src

pm2 start server.js -w

pm2 list

pm2 start server.js -w -i max

pm2 list

```

# Options to NGINX
```
npm start 8082
npm start 8083
npm start 8084
npm start 8085

nginx -t 
nginx -s reload
```