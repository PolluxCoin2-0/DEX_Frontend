 //Aamil testing
pipeline { 
    agent { label 'EXPLORER_FRONTEND_NODE' }

    stages {
        stage('Github Checkout') {
            steps { 
         git branch: 'main', credentialsId: 'gitscm', url: 'https://github.com/PolluxCoin2-0/DEX_Frontend.git'
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
                sh 'rm -rf /var/www/html/uviswap/*'
                sh 'cp -r dist/* /var/www/html/uviswap'
                
            }
        }
    }
}
