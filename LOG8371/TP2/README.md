LOG8371_TP2

#How to build the container
cd jguwekarest-master
mvn clean package
docker build -t <USER>/<IMAGE_NAME> .

#How to start the docker container
docker pull mongo; docker run --name mongodb -d mongo
docker run -p 8080:8080 -p 8849:8849 --link mongodb:mongodb <USER>/<IMAGE_NAME>

#You need to connect JProfiler GUI to the container with the following configuration:
#Attach : On another computer
#Direct nectwork connection to
0.0.0.0
#Profiling port
8849

#You can access the UI of Weka in the browser
http://0.0.0.0:8080
