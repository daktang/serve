version: "3"

vars:
  KIND_PROFILE: "{{.KIND_PROFILE}}"
  KIND_NODE_IMAGE: "{{.KIND_NODE_IMAGE}}"
  KUBECONFIG: "{{.KUBECONFIG}}"

tasks:

  kind:start:
    desc: Create kind cluster (minikube start replacement)
    cmds:
      - |
        if kind get clusters 2>/dev/null | grep -q "^${KIND_PROFILE}$"; then
          echo "Kind cluster ${KIND_PROFILE} already exists"
        else
          echo "Creating kind cluster ${KIND_PROFILE}..."
          kind create cluster \
            --name ${KIND_PROFILE} \
            --image ${KIND_NODE_IMAGE} \
            --kubeconfig ${KUBECONFIG}
        fi

  kind:delete:
    desc: Delete kind cluster
    cmds:
      - |
        if kind get clusters 2>/dev/null | grep -q "^${KIND_PROFILE}$"; then
          echo "Deleting kind cluster ${KIND_PROFILE}..."
          kind delete cluster --name ${KIND_PROFILE}
        else
          echo "Kind cluster ${KIND_PROFILE} does not exist"
        fi
