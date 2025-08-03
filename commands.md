# 🚀 Docker and Kubernetes Commands

This document contains a list of the commands used to containerize and deploy your application on a local Kubernetes cluster.

---

## 🐳 Docker Commands

### 🔧 Build the Docker Image
```bash
docker build -t habitink-app:latest .

---
### 
docker run -p 5001:5001 habitink-app:latest

###
 kubectl apply -f deployment.yaml
 kubectl get pods
 kubectl get services
