//Aamil testing
pipeline { 
    agent { label 'api-pollux' }

    stages {
        stage('Github Checkout') {
            steps { 
                git branch: 'main', credentialsId: '9b5c3a4e-16ce-4c9b-acf5-f49742211129', url: 'https://github.com/PolluxCoin2-0/DEX_Frontend.git'
            }
        }
        
        stage('Copy .env file') { 
            steps { 
                script {
                    configFileProvider([configFile(fileId: 'dex-frontend-env-file', variable: 'ENV_FILE')]) {
                        sh 'cp "$ENV_FILE" /home/jenkins/workspace/dex-frontend-prod-cicd-pipeline/.env'
                    }
                }
            }
        }

        stage('Installing Dependencies') {
            steps {
                sh 'rm -rf node_modules || true'
                sh 'npm i' 
            }
        }

        stage('Build the Frontend Application') {
            steps {
                sh 'rm -rf dist || true'
                sh 'npm run build'
                sh 'chmod 755 dist/assets/*'
                sh 'chmod 755 dist/index.html'
            }
        } 

        stage('Deploy to Web Server') {
            steps {
                sh 'rm -rf /var/www/html/*'
                sh 'rm -rf /var/www/uviswap/*'
                sh 'cp -r dist/* /var/www/html'
                sh 'cp -r dist/* /var/www/uviswap'
            }
        }
    }
}
