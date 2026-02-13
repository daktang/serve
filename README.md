# -----------------------------
# 1. Git Tag (skaffold gitCommit 대체)
# -----------------------------
git_sha = local("git rev-parse --short HEAD", quiet=True).strip()

# -----------------------------
# 2. Docker Build (push 없음 = 로컬 클러스터용)
# -----------------------------
docker_build(
    "fastapi-starter-kit",   # image name
    ".",                     # build context (Dockerfile 위치)
    dockerfile="Dockerfile",
    tag=git_sha,
)

# -----------------------------
# 3. Helm Deploy
# -----------------------------
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
# 4. kind 클러스터 이미지 자동 로드
# -----------------------------
k8s_kind()
