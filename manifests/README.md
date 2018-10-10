# [WIP] Kubernetes manifests

You can use the files in this directory with `kustomize` to create a
kubernetes cluster of the app. Ex:

`kustomize build manifests/overlays/minikube | kubectl apply -f -`

to start a local cluster and

`minikube service --namespace=kube-system traefik-ingress-service`

to open the service.
