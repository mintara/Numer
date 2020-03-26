"# Mintara" 
"# Numer" 
"# NumerProjectwithDocker"

docker pull mintara2555/mintara:app
docker pull mintara2555/mintara:api
docker pull mongo

docker run -p 80:3000 -d mintara2555/mintara:app
docker run -p 8080:8080 -d mintara2555/mintara:api
docker run -p 27017:27017 -d mongo

192.168.99.100

docker stop $(docker ps -aq)


docker system prune -a --volumes
