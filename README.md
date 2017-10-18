# Docker NATS Provisioning Script

This script offers a quick solution to provision a Docker container for NATS: a simple, high performance open source messaging system for cloud native applications, IoT messaging, and microservices architectures.


#### Requirements

* Just Docker (Tested on 17.09)


## Usage

Pull down the script 

```shell
wget https://raw.githubusercontent.com/lukeawyatt/provision-docker-nats/master/provision-docker-nats.sh -O provision-docker-nats.sh
```

Modify the permissions to allow execution

```shell
chmod u+x provision-docker-nats.sh
```

Execute the script with superuser privileges to provision NATS.  Clip the output for your records.  This script can be re-ran since it'll break down the existing containers first.  This script can also be re-ran as is to upgrade the base docker images.
```shell
sudo ./provision-docker-nats.sh
```

**Provisioned Ports:**
- NATS Client Port: 4222
- NATS Cluster Port: 6222
- NATS HTTP Monitoring Port: 8222


## Examples

Look in the **Examples** folder for Subscribe and Publish example scripts written in NodeJS.  These can be manipulated for quick testing and will currently connect explicitly to the localhost NATS client port.


## Upgrading

When new versions of the packaged Dockerhub images are released, simply re-run this script to upgrade.  The new image will be downloaded and utilized during re-build.


## Tested Versions

My test environment is as follows.  If you have tested in another environment/version set, please add to this list.

* Ubuntu 16.04.3 LTS
* GNU Bash 4.3.48
* Docker CE 17.09.0


## Feedback

If you have any problems with or questions about this script, please contact me using a [GitHub Issue](https://github.com/lukeawyatt/provision-docker-nats/issues)
