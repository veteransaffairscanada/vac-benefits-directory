# Kubernetes manifests

You can use the files in this directory with `kustomize` to create a
kubernetes cluster of the app. Ex:

`kustomize build manifests/overlays/minikube | kubectl apply -f -`

to start a local cluster and

`minikube service --namespace=kube-system traefik-ingress-service`

to open the service.

## Secrets

The app requires two secrets to be in the cluster to run properly:

`kubectl create secret generic vac-benefits-directory --from-literal=airtable_write_key=YOUR_KEY`

and

`kubectl create secret generic datadog --from-literal=apikey=YOUR_KEY`

## Amazon EKS

The easiest way to start with EKS is to use `eksctl`. Once you have created your
cluster you can run:

`kustomize build manifests/overlays/eks | kubectl apply -f -`

You then can look in your EC2 load balancers to find out the name of load balancer
and then add it to your DNS.
