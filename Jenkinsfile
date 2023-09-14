pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'deeplifez/nodeapp:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Deploy Docker Container') {
            steps {
                script {
                    // Build the Nuxt.js application for the desired environment
                    sh "npm install"
                    sh "npm run build_dev"  // or "npm run build_stage" or "npm run build_prod" as needed

                    // Build the Docker image
                    sh "docker build -t ${DOCKER_IMAGE} ."

                    // Deploy the Docker container
                    sh "docker run -d -p 3000:3000 --name my-nodeap-container npm run start_dev ${DOCKER_IMAGE}"                  
                }
            }
        }
    }
}
