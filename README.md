helm template test deployments/helm \
> --namespace default \
> --values deployments/helm/values.yaml 
---
# Source: helm/templates/serviceaccount_registry.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default-registry
  labels:
    helm.sh/chart: helm-0.1.0
    app.kubernetes.io/name: helm
    app.kubernetes.io/instance: test
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
imagePullSecrets:
  - name: test-helm-registry
---
# Source: helm/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: test-helm
  labels:
    helm.sh/chart: helm-0.1.0
    app.kubernetes.io/name: helm
    app.kubernetes.io/instance: test
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
spec:
  type: ClusterIP
  ports:
    - port: 8080
      targetPort: 
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: helm
    app.kubernetes.io/instance: test
---
# Source: helm/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-helm
  labels:
    helm.sh/chart: helm-0.1.0
    app.kubernetes.io/name: helm
    app.kubernetes.io/instance: test
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: helm
      app.kubernetes.io/instance: test
  template:
    metadata:
      labels:
        app.kubernetes.io/name: helm
        app.kubernetes.io/instance: test
    spec:
      serviceAccountName: default
      securityContext:
        {}
      containers:
        - name: helm
          securityContext:
            {}
          image: ":0.1.0"
          imagePullPolicy: 
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {}
---
# Source: helm/templates/gateway.yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: test-helm
spec:
  selector:
    istio: ingressgateway
  servers:
  - hosts:
    - "minikube.syun7-kim.alpha.aip.samsungds.net"
    port:
      name: http
      number: 80
      protocol: HTTP
---
# Source: helm/templates/virtualservice.yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: test-helm
spec:
  hosts:
  - "minikube.syun7-kim.alpha.aip.samsungds.net"
  gateways:
  - test-helm
  http:
  - route:
    - destination:
        host: test-helm
        port:
          number: 8080
---
# Source: helm/templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "test-helm-test-connection"
  labels:
    helm.sh/chart: helm-0.1.0
    app.kubernetes.io/name: helm
    app.kubernetes.io/instance: test
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: wget
      image: busybox
      command: ['wget']
      args: ['test-helm:8080']
  restartPolicy: Never
