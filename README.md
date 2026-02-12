# ---------------------------------- PROJECT CONFIG -----------------------------------  
export BASE_DIR=$(pwd -P)  
export PROFILE_NAME=$(basename $BASE_DIR)  
export PROJECT_NAME=$PROFILE_NAME  
export PROJECT_ENV=dev  
export PROJECT_VERSION="v0.0.1"

# ---------------------------------- ADMIN CONFIG -----------------------------------  
export PROJECT_ADMIN="AISERVING_SERVICE_ADMIN"

# In-Memory Cache OIDC ID  
export PROJECT_API_USER_ID=""               # ID 제거  
export AISERVING_PROJECT_API_USER_ID=""     # ID 제거

if [ "$PROJECT_ENV" == "dev" ]; then  
    export PROJECT_API_USER_PW=""                     # 비밀값 제거  
    export AISERVING_PROJECT_API_USER_PW=""           # 비밀값 제거  
    export PROJECT_ADMIN_TOKEN_EXP_DEFAULT="28800s" # 8 hour  
elif [ "$PROJECT_ENV" == "prod" ]; then  
    export PROJECT_API_USER_PW=""                     # 비밀값 제거  
    export AISERVING_PROJECT_API_USER_PW=""           # 비밀값 제거  
    export PROJECT_ADMIN_TOKEN_EXP_DEFAULT="28800s" # 8 hour  
else  
    echo "Invalid PROJECT_API_USER_PW value. Please use 'dev' or 'prod'."  
    exit 1  
fi

# ---------------------------------- LOGGING CONFIG -----------------------------------  
export GLOBAL_LOG_LEVEL="DEBUG"

# ---------------------------------- SSL CONFIG -----------------------------------  
export SSL_CERT_DIR="/etc/ssl/certs"  
export CURL_CA_BUNDLE="/etc/ssl/certs/ca-certificates.crt"  
export REQUEST_CA_BUNDLE="/etc/ssl/certs/ca-certificates.crt"

# ---------------------------------- PYTHON & PACKAGE MANAGEMENT CONFIG -----------------------------------  
export PYTHON_VERSION="3.12"

### CONDA & POETRY  
if [ $(conda env list | grep -i $PROFILE_NAME | wc -l) -lt 1 ]; then  
	conda create -y -n $PROFILE_NAME python=$PYTHON_VERSION poetry  
fi  
layout conda $PROFILE_NAME

# ---------------------------------- KUBERNETES CONFIG -----------------------------------  
mkdir -p $BASE_DIR/.kube  
export KUBECONFIG=$BASE_DIR/.kube/config  
export KUBERNETES_CLUSTER_API_SERVER_URL=""   # URL 제거

# ---------------------------------- MINIKUBE CONFIG -----------------------------------  
export MINIKUBE_PROFILE=$(basename $BASE_DIR)  
export MINIKUBE_EMBED_CERTS=true  
export MINIKUBE_DELETE_ON_FAILURE=true  
export MINIKUBE_DRIVER=docker  
export MINIKUBE_CPUS=2  
export MINIKUBE_MEMORY=4g  
export MINIKUBE_DISK_SIZE=50g  
export MINIKUBE_IMAGE_REPOSITORY=""          # samsungds 제거  
export MINIKUBE_BASE_IMAGE=""                # 베이스 이미지 제거  
export MINIKUBE_KUBERNETES_VERSION=v1.29.14  #1.31.12 upgrade 목표.
export MINIKUBE_BINARY_MIRROR=""             # Nexus URL 제거  
export PATH=$HOME/.minikube/cache/linux/amd64/$MINIKUBE_KUBERNETES_VERSION:$PATH  
eval $(minikube -p $MINIKUBE_PROFILE docker-env) # minikube & local docker image share

# ---------------------------------- CI/CD CONFIG -----------------------------------  
### SKAFFOLD  
export SKAFFOLD_DEFAULT_REPO=""               # URL 제거

### IMAGE BUILD  
export IMAGE_REPOSITORY=""                    # URL 제거  
export IMAGE_PULL_POLICY="IfNotPresent"

### HELM  
export HELM_PACKAGE_NAME=$PROFILE_NAME  
export KUBERNETES_DEPLOY_NAMESPACE=default  
export KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME=$PROFILE_NAME  
export SERVICE_TARGET_PORT="8000"

### INGRESS  
export INGRESS_ENABLED="true"  
export INGRESS_CLASSNAME="istio"  
export INGRESS_VERSION=v1.23.5                # 1.25.3 upgrade 목표.
export INGRESS_HOSTNAME=""                    # URL/호스트명 제거

# ---------------------------------- ECO SYSTEM CONFIG -----------------------------------  
### OIDC(KEYCLOAK)
export OIDC_CLIENT_ID=""                     # ID 제거  
export OIDC_REALM_NAME=""                    # ID 제거  
export OIDC_ENV=dev  
if [ "$OIDC_ENV" == "dev" ]; then  
    export OIDC_BASE_URL=""                  # URL 제거  
    export OIDC_CLIENT_SECRET=""             # 비밀값 제거  
elif [ "$OIDC_ENV" == "prod" ]; then  
    export OIDC_BASE_URL=""                  # URL 제거  
    export OIDC_CLIENT_SECRET=""             # 비밀값 제거  
else  
    echo "Invalid OIDC_ENV value. Please use 'dev' or 'prod'."  
    exit 1  
fi

# ---------------------------------- MANAGEMENT API CONFIG -----------------------------------  
export OIDC_MANAGEMENT_SERVICE_URL=""        # URL 제거  


# ---------------------------------- DATABASE CONFIG -----------------------------------  
# POSTGRESQL  
export PGSQL_DATABASE_HOST=""                # URL/호스트 제거  
export PGSQL_DATABASE_PORT="9999"  
export PGSQL_DATABASE_USER=""                # ID 제거  
export PGSQL_DATABASE_PASSWORD=""            # 비밀값 제거  
export PGSQL_DATABASE_NAME=""  
export PGSQL_DATABASE_SCHEMA=v1

