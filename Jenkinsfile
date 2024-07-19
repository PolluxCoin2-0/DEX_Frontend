pipleine { 
    agent { label 'api-pollux' }

    stages {
        stage('Github Checkout') {
            steps { 
                git branch: 'main', credentialsId: 'github-auth', url: 'https://github.com/PolluxCoin2-0/Yuvi_Swap_Main.git'
            }
        }
        
        stage('Copy .env file') { 
            steps { 
                scripts {
                    configFileProvider([configFile(fileId: 'dex-frontend-env-file', variable: 'ENV_FILE')]) {
                        sh 'cp "$ENV_FILE" /home/jenkins/workspace/dex-frontend-prod-cicd-pipeline/.env'
                }
            }
        }
    }

        stage('Installing Dependencies') {
            steps {
                sh 'npm i' 
            }
        }

        stage('Build the Frontend application') {
            steps {
                sh 'npm run build'
            }
        } 

        // stage('Coping the files under /dist folder') {
        //     steps {
        //         sh '
        //     }
        // }
}

}