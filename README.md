version: '3'

vars:
  CLUSTER_NAME: '{{.PROFILE_NAME}}'
  NODE_IMAGE: '{{.KIND_NODE_IMAGE}}'

tasks:

  create:
    desc: Create kind cluster
    cmds:
      - |
        if kind get clusters | grep -q "^{{.CLUSTER_NAME}}$"; then
          echo "Cluster {{.CLUSTER_NAME}} already exists"
        else
          kind create cluster \
            --name {{.CLUSTER_NAME}} \
            --image {{.NODE_IMAGE}} \
            --kubeconfig .kube/config
        fi

  use:
    desc: Use cluster context
    cmds:
      - kubectl config use-context kind-{{.CLUSTER_NAME}}

  delete:
    desc: Delete kind cluster
    cmds:
      - kind delete cluster --name {{.CLUSTER_NAME}}

  status:
    desc: Show clusters
    cmds:
      - kind get clusters
      - kubectl config get-contexts
