#!/bin/bash
################################################################
##           UBUNTU-DOCKER-NATS PROVISIONING SCRIPT           ##
##           ********* RUN AS A SUPERUSER *********           ##
##                                                            ##
## Author:                                        Luke Wyatt  ##
## Contact:                                 <luke@meat.space> ##
## Create Date:                                    2017.10.12 ##
## Repository:    github.com/lukeawyatt/provision-docker-nats ##
################################################################

# REQUIREMENTS:
# ****************
# Docker (Tested on 17.09)



# LEAVE EVERYTHING ALONE BELOW THIS LINE
# **************************************
# SYSTEM SETUP
echo "1) SYSTEM SETUP"
systemctl enable docker
echo;echo;



# PULL NAS DOCKER IMAGES
echo "2) PULLING NATS IMAGE"
docker pull nats:latest
echo;echo;



# STAGE ENVIRONMENT
echo "3.A) STAGING NATS CONTAINER"
echo;

echo "Stopping existing NATS container if exists..."
docker stop NATS
echo "Removing existing NATS container if exists..."
docker rm NATS
echo;echo;



# RUN NATS CONTAINERS
echo "4) LAUNCH NATS CONTAINER"
docker run \
	--network="host" \
	--publish=4222:4222 \
	--publish=6222:6222 \
	--publish=8222:8222 \
	--restart=unless-stopped \
	--detach=true \
	--name=NATS \
	nats:latest
echo;echo;



# CLEANUP
echo "5) DOCKER CLEANUP TIME"
echo "Removing empty containers..."
docker system prune -a -f --volumes
# FOR USE WITH DOCKER ENGINE <= 1.13
# echo "NOTE THIS WILL ERROR WHEN NOTHING NEEDS TO BE CLEANED UP"
# docker rm -v $(docker ps -a -q -f status=exited)
# echo "Removing unused images..."
# echo "NOTE THIS WILL ERROR WHEN NOTHING NEEDS TO BE CLEANED UP"
# docker rmi $(docker images -f "dangling=true" -q)
echo;echo;



# PROVISIONED OUTPUT
echo "YOUR PROVISIONED PATHS - COPY FOR YOUR RECORDS:"
echo "NATS Client Port: 4222"
echo "NATS Cluster Port: 6222"
echo "NATS HTTP Port: 8222"
echo;
