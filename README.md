## Title

## Take note:

Remember, Docker is only for Production, not for development. Also, there are two branches set to Auto deploy: the `main` branch is not on a domain, only on an IP that you can visit on port 80, while the `domainSsl` branch is on a domain when deployed and has an SSL certificate, but the SSL is outside of Docker. So, in short, you need to install certbot. After installing certbot, uninstall nginx, and stop the running port 80 as it conflicts with Docker’s port. Also, for setting this up, it is better to use the Ubuntu live server, and if you push to `main` or `domainSsl`, it is better to use branch and merge requests. Avoid committing or pushing directly to the `main` and `domainSsl` branches.

For the domain SSL, you need your own domain and email; you may use a temporary email, and also a dedicated IP.

## For setting up the system, Docker Installation:

### First Step

Docker v2:
Noted: this installation using ubuntu 22 so code name is ***jammy*** .
if you are using 20.04 just change to ***focal*** , if 18.04 -> ***bionic***
***sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"***
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"
sudo apt update
sudo apt-cache policy docker-ce
sudo apt install docker-ce
docker ps
```
### Second Step
```bash
git clone https://github.com/McEmil1993/technical-test.git 
cd technical-test
```
Change the IP of the backend and frontend.
For the backend, just change the DATABASE HOST IP located in:
```bash 
nano back-end/.env
```
Don't worry about the MYSQL user because it is already in the Docker build.
```bash 
## .env
PORT=3000
SQL_HOST=<Change this to private ip>
SQL_USERNAME=testuser 
SQL_PASSWORD=1234a
SQL_DB=main
SQL_PORT=3306
JWT_SECRET='YRK2znOF9XDCwQz'
```
For the frontend, change the IP to connect to the backend located in:
```bash
cd vue-frontend
nano .env.development
VITE_BACKEND_URL=http://<change this>/api

nano .env.production
VITE_BACKEND_URL=http://<change this>/api
```
Note: Use your server's IP.
Before build use ***main*** branch
Then build Docker:
```bash
docker compose up --build -d
```
Then visit:
```bash
http://<your ip>
```

User: admin@admin.com 
Password: admin@admin.com

For CI/CD, to make this work: Whoever pushes or merges to the ***main*** or ***domainSsl*** branch, it will auto deploy.

If you have questions , just email me. 
dacoylomarkemilcajes@gmail.com

TY......