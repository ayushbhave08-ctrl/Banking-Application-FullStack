# Full-Stack Banking Application (Spring Boot + Angular + MySQL + Docker + AWS)

A full-stack banking web application supporting account creation, deposits, withdrawals, real-time balance updates, and transaction management, containerized with **Docker & Docker Compose** and configured for **AWS EC2** deployment with a **Jenkins CI/CD** pipeline.

## Architecture Overview

```text
User Browser (HTTP :80)
        |
        v
+-------------------------------+
|   Nginx Reverse Proxy         |  (Container: banking-frontend)
|   - Serves Angular Build      |
|   - /api/*  --> Backend :8080 |
|   - /ws     --> WebSocket     |
+---------------+---------------+
                |
                v
+-------------------------------+
|   Spring Boot REST API        |  (Container: banking-backend)
|   - Java 21 / Spring Data JPA |
+---------------+---------------+
                |
                v
+-------------------------------+
|   MySQL 8.0 Database          |  (Container: banking-mysql)
|   - Persistent Docker Volume  |
+-------------------------------+
```

## Tech Stack

- **Backend:** Java 21, Spring Boot, Spring Data JPA, Hibernate, REST APIs, Maven
- **Frontend:** Angular, TypeScript, HTML5, CSS3, Nginx
- **Database:** MySQL 8.0
- **DevOps & Cloud:** Docker, Docker Compose (Multi-Stage Builds), Jenkins CI/CD, AWS EC2 (Ubuntu 24.04 LTS)

## Quick Start (Run Locally with Docker)

```bash
git clone [https://github.com/ayushbhave08-ctrl/Banking-Application-FullStack.git](https://github.com/ayushbhave08-ctrl/Banking-Application-FullStack.git)
cd Banking-Application-FullStack
docker compose up -d --build
```

- **Frontend UI:** `http://localhost:4200` (or `http://localhost` on port `80`)
- **Backend API:** `http://localhost:8080/api/accounts`

## AWS EC2 Cloud Deployment Steps

1. Provisioned an **Ubuntu 24.04 LTS** EC2 instance (`ap-southeast-2`) with Security Group inbound rules for ports `22` (SSH), `80` (HTTP), and `443` (HTTPS).
2. Installed Docker Engine and Docker Compose plugin on the EC2 host.
3. Configured `docker-compose.yml` to map port `80:80` for Nginx and isolated MySQL on the internal Docker bridge network.
4. Automated build and container rollout using the included `Jenkinsfile`.
