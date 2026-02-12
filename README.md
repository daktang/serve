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
