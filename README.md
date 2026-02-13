git_sha = local("git rev-parse --short HEAD").strip()

# Docker Build(No Push)
# -----------------------------
docker_build(
    "fastapi-starter-kit",   # image name
    ".",                     # build context (Dockerfile)
    dockerfile="Dockerfile",
    tag=git_sha,
)

# Helm Deploy
# -----------------------------
helm_release(
    name=os.getenv("HELM_PACKAGE_NAME"),
    namespace=os.getenv("KUBERNETES_DEPLOY_NAMESPACE"),
    chart="deployments/helm",    
    values=["deployments/helm/values.yaml"],
    set={
        # IMAGE
        "image.repository": os.getenv("IMAGE_REPOSITORY"),
        "image.tag": git_sha,
        "image.pullPolicy": os.getenv("IMAGE_PULL_POLICY"),

        # CONTAINER
        "containers.ports.containerPort": os.getenv("SERVICE_TARGET_PORT")
        
        # SERVICE
        "service.targetPort": os.getenv("SERVICE_TARGET_PORT"),
        
        # SERVICE ACCOUNT
        "serviceAccount.name": os.getenv("KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME"),

        # INGRESS
        "ingress.enabled": os.getenv("INGRESS_ENABLED"),
        "ingress.className": os.getenv("INGRESS_CLASSNAME"),
        "ingress.hosts[0].host": os.getenv("INGRESS_HOSTNAME"),
        "ingress.hosts[0].paths[0].path": /,
        "ingress.hosts[0].paths[0].pathType": Prefix,
    },
)

# 4. kind 클러스터 이미지 자동 로드
# -----------------------------
k8s_kind()


apiVersion: skaffold/v4beta6
kind: Config
metadata:
  name: aiserving-service
profiles:
  - name: local
    activation:
      - command: local
    build:
      local:
        push: false # should images be pushed to a registry. If not specified, images are pushed only if the current Kubernetes context connects to a remote cluster.
      tagPolicy:
        gitCommit: {}
      artifacts:
        - image: aiserving-service
          docker:
            dockerfile: Dockerfile
    deploy: # describes how the manifests are deployed.
      helm:
        releases:
          - name: "{{.HELM_PACKAGE_NAME}}"
            chartPath: deployments/helm # skaffold template not support value
            valuesFiles:
              - deployments/helm/values.yaml
            setValueTemplates:
              useGenerateBackendConfig: "true"
              # Image Template
              image.repository: "{{.IMAGE_REPO_aiserving_service}}"
              image.tag: "{{.IMAGE_TAG_aiserving_service}}@{{.IMAGE_DIGEST_aiserving_service}}"
              image.pullPolicy: "{{.IMAGE_PULL_POLICY}}"
              # namespace Template
              namespace: "{{.KUBERNETES_DEPLOY_NAMESPACE}}"
              # container Template
              containers.ports.containerPort: "{{.SERVICE_TARGET_PORT}}"
              # serviceaccount Template
              serviceAccount.name: "{{.KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME}}"
              # service Template
              service.targetPort: "{{.SERVICE_TARGET_PORT}}"
              # Ingress Template
              ingress.enabled: "{{.INGRESS_ENABLED}}"
              ingress.className: "{{.INGRESS_CLASSNAME}}"
              ingress.hosts[0].host: "{{.INGRESS_HOSTNAME}}"
              ingress.hosts[0].paths[0].path: /
              ingress.hosts[0].paths[0].pathType: Prefix
