# Graceful Shutdown example
 Environment to test rolling update behavior with graceful shutdown handling.

## Dependencies

* Docker
* Kind
* Kubectl

# Install resources

### Create cluster

```bash

# Create cluster
kind create cluster --name kind --config kind/cluster.yml

# Check clusters
kind get clusters

# Check cluster it's running
kubectl cluster-info --context kind-kind

```

### 1. Install NGINX Ingress

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

### 2. Apply resources via k8s files

```bash

# Deployment and Service
kubectl apply -f k8s/resources.yml -n default


# Ingress
kubectl apply -f k8s/ingress-nginx.yaml -n default
```

### 3. Check resources running

```bash

# Pods
kubectl get pod --namespace=default

# Services
kubectl get service --namespace=default

# Ingress
kubectl get ingress --namespace=default

```

### 4. Access URL to track behavior

```bash
# To check current version
http://localhost/

# To check readness behavior
http://localhost/health/ready

```

### 5. Update the deployment version

```bash
# Load Balancer
kubectl set env deployment/my-node-app VERSION=V2
```

### 6. Check the rolling update behavior

```bash
kubectl get pods -l app=my-node-app
```

![](/images/pods.png)

### 7. Check the pod terminating log

```bash
kubectl logs -f <pod-name>
```

![](/images/log.png)

# Uninstall

```bash

# Deployment and Resources
kubectl delete -f k8s/resources.yml -n default

# Ingress
kubectl delete -f k8s/ingress-nginx.yaml -n default

# Cluster
kind delete cluster --name kind

```

