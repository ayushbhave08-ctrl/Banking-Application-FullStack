pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ayushbhave08-ctrl/Banking-Application-FullStack.git'
            }
        }

        stage('Build & Test Backend') {
            steps {
                dir('BankingApplication') {
                    sh 'mvn clean test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }
    }
}
