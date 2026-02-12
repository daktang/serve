task kind:start
task: [kind:start] if kind get clusters | grep -q "^uv-fastapi-starter-kit$"; then
  echo "Cluster uv-fastapi-starter-kit already exists"
else
  kind create cluster
    --name uv-fastapi-starter-kit
    --image mirror.net/docker.io/kindest/node:v1.31.12
    --kubeconfig .kube/config
fi

No kind clusters found.
Creating cluster "kind" ...
 ✗ Ensuring node image (kindest/node:v1.35.0) 🖼 
ERROR: failed to create cluster: failed to pull image "kindest/node:v1.35.0@sha256:452d707d4862f52530247495d180205e029056831160e22870e37e3f6c1ac31f": command "docker pull kindest/node:v1.35.0@sha256:452d707d4862f52530247495d180205e029056831160e22870e37e3f6c1ac31f" failed with error: exit status 1
Command Output: Error response from daemon: Get "https://registry-1.docker.io/v2/": read tcp 10.166.236.81:39500->35.169.121.184:443: read: connection reset by peer
task: Failed to run task "kind:start": exit status 1
