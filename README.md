
# -----------------------------
# 1. Docker Build
git_sha = local("git rev-parse -short HEAD").strip()

docker_build(
    "fastapi-starter-kit",   # Image Name
    ".",                     # build context
    tag=git_sha,
)

# -----------------------------
# 2. Helm Render

# Helm deploy
helm_release(
    name=os.getenv("HELM_PACKAGE_NAME", "fastapi-starter-kit"),
    chart="deployments/helm",
    namespace=os.getenv("KUBERNETES_DEPLOY_NAMESPACE", "default"),
    values=["deployments/helm/values.yaml"],
    set={
        "image.repository": "fastapi-starter-kit",
        "image.tag": git_sha,
        "image.pullPolicy": os.getenv("IMAGE_PULL_POLICY", "IfNotPresent"),
        "serviceAccount.name": os.getenv("KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME", "fastapi-starter-kit"),
        "service.targetPort": os.getenv("SERVICE_TARGET_PORT", "8000"),
    },
)


# -----------------------------
# 3. Apply to Cluster
k8s_yaml(helm_chart)

# -----------------------------
# 4. kind 이미지 자동 로드
k8s_kind()
