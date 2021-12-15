pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        NAME = "${JOB_NAME.replaceAll("/", "-").toLowerCase()}"

        DEV_NAME = "${NAME}"
        DEV_TYPE = "build"
        DEV_HOST = "$GL_TEST_WEBSITES"
        DEV_DEPLOY_PATH = "$GL_TEST_WEBSITES_PATH"
        DEV_PASS = credentials('gl_test_websites')

        DEMO_NAME = "${NAME}"
        DEMO_TYPE = "prod"
        DEMO_HOST = "$GL_DEMO_WEBSITES"
        DEMO_DEPLOY_PATH = "$GL_DEMO_WEBSITES_PATH"
        DEMO_PASS = credentials('gl_demo_websites')
    }
    stages {
        stage ('Checkout') {
            steps {
                sh 'printenv'
            }
        }
        stage('Build & Deploy Test') {
            when { not { branch 'master' } }
            steps {
                sh "docker build -f Dockerfile --build-arg DEPLOY_TYPE=$DEV_TYPE --build-arg DEPLOY_PASS=$DEV_PASS --build-arg DEPLOY_NAME=$DEV_NAME --build-arg DEPLOY_HOST=$DEV_HOST --build-arg DEPLOY_PATH=$DEV_DEPLOY_PATH -t $NAME ."
            }
        }
        stage('Build & Deploy Prod') {
            when { branch 'master' }
            steps {
                sh "docker build -f Dockerfile --build-arg DEPLOY_TYPE=$DEMO_TYPE --build-arg DEPLOY_PASS=$DEMO_PASS --build-arg DEPLOY_NAME=$DEMO_NAME --build-arg DEPLOY_HOST=$DEMO_HOST --build-arg DEPLOY_PATH=$DEMO_DEPLOY_PATH -t $NAME ."
            }
        }
    }
}

