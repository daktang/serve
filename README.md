project = os.getenv("PROJECT_NAME")
image_registry = os.getenv("IMAGE_REGISTRY")
image_repository = os.getenv("IMAGE_REPOSITORY")
image_full = f"{image_registry}/{image_repository}/{project}"

git_sha = local("git rev-parse --short HEAD").strip()

# Docker Build
# -----------------------------
docker_build(
    image_full, # image full
    ".",        # build context    
    dockerfile="Dockerfile",
    tag=git_sha,
    push=False  # local only
)

# Helm Deploy
# -----------------------------
helm_release(
    name=project,
    namespace=os.getenv("KUBERNETES_DEPLOY_NAMESPACE"),
    chart="deployments/helm",    
    values=["deployments/helm/values.yaml"],
    set={
        # IMAGE
        "image.repository": image_full,
        "image.tag": git_sha,
        "image.pullPolicy": os.getenv("IMAGE_PULL_POLICY"),

        # CONTAINER
        "containers.ports.containerPort": os.getenv("SERVICE_TARGET_PORT"),
        
        # SERVICE
        "service.targetPort": os.getenv("SERVICE_TARGET_PORT"),
        
        # SERVICE ACCOUNT
        "serviceAccount.name": os.getenv("KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME"),

        # INGRESS
        "ingress.enabled": os.getenv("INGRESS_ENABLED"),
        "ingress.className": os.getenv("INGRESS_CLASSNAME"),
        "ingress.hosts[0].host": os.getenv("INGRESS_HOSTNAME"),
        "ingress.hosts[0].paths[0].path": "/",
        "ingress.hosts[0].paths[0].pathType": "Prefix",
        },
)

# 4. kind 클러스터 이미지 자동 로드
# -----------------------------
k8s_kind()
