pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t adityabd/node-cicd-demo:latest .'
            }
        }

        stage('Docker Push') {
            environment {
                DOCKER_CREDS = credentials('dockerhub-creds')
            }

            steps {
                bat 'docker login -u "%DOCKER_CREDS_USR%" -p "%DOCKER_CREDS_PSW%"'
                bat 'docker push adityabd/node-cicd-demo:latest'
            }
        }

        stage('Kubernetes Check') {
    environment {
        KUBECONFIG_FILE = credentials('minikube-kubeconfig')
    }

    steps {
        bat 'kubectl --kubeconfig="%KUBECONFIG_FILE%" get nodes'
    }
}
    }
}