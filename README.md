# -----------------------------
# 1. Docker Build
# -----------------------------
docker_build(
    "fastapi-starter-kit",   # 이미지 이름
    context=".",             # Dockerfile 위치 (루트에 있다고 가정)
)

# -----------------------------
# 2. Helm Render
# -----------------------------
helm_chart = helm(
    "./deployments/helm",
    name="fastapi-starter-kit",
)

# -----------------------------
# 3. Apply to Cluster
# -----------------------------
k8s_yaml(helm_chart)

# -----------------------------
# 4. kind 이미지 자동 로드
# -----------------------------
k8s_kind()
