pipeline {
    agent any

    environment {
        IMAGE = "adityabd/node-cicd-demo:${BUILD_NUMBER}"
    }

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
                bat 'docker build -t %IMAGE% .'
            }
        }

        stage('Docker Push') {
            environment {
                DOCKER_CREDS = credentials('dockerhub-creds')
            }

            steps {
                bat 'docker login -u "%DOCKER_CREDS_USR%" -p "%DOCKER_CREDS_PSW%"'
                bat 'docker push %IMAGE%'
            }
        }

        stage('Deploy to Kubernetes') {
            environment {
                KUBECONFIG_FILE = credentials('minikube-kubeconfig')
            }

            steps {
                bat 'kubectl --kubeconfig="%KUBECONFIG_FILE%" set image deployment/node-cicd-demo node-cicd-demo=%IMAGE%'
                bat 'kubectl --kubeconfig="%KUBECONFIG_FILE%" rollout status deployment/node-cicd-demo'
            }
        }
    }
}