version: '3'

vars:
  CLUSTER_NAME: '{{.KIND_PROFILE}}'
  NODE_IMAGE: '{{.KIND_NODE_IMAGE}}'
  KUBECONFIG_PATH: '{{.KUBECONFIG}}'

tasks:

  kind:start:
    desc: Create kind cluster (minikube start replacement)
    cmds:
      - |
        if kind get clusters | grep -q "^${CLUSTER_NAME}$"; then
          echo "Kind cluster ${CLUSTER_NAME} already exists"
        else
          kind create cluster \
            --name ${CLUSTER_NAME} \
            --image ${NODE_IMAGE} \
            --kubeconfig ${KUBECONFIG_PATH}
        fi

  kind:delete:
    desc: Delete kind cluster
    cmds:
      - kind delete cluster --name ${CLUSTER_NAME}

  kind:status:
    desc: Check cluster status
    cmds:
      - kubectl get nodes
