# This will list the commands to get your microservices running in minikube

# If you want to delete all services, deployments and pods, run the following command
kubectl delete --all deployments,services,pods,configmap,persistentvolumes,persistentvolumeclaims --namespace=btd 

# You will need to make sure minikube is running - `minikube start` 

docker-compose up -d --build

# This loads an image into Minikube for use there
# https://minikube.sigs.k8s.io/docs/handbook/pushing/#7-loading-directly-to-in-cluster-container-runtime
echo Uploading btd-core-auth image to minikube - be patient.
minikube image load btd-core-auth
echo Uploading btd-core-postgres image to minikube - be patient.
minikube image load btd-core-postgres

# Create a namespace in minikube
kubectl create namespace btd
kubectl config set-context --current --namespace=btd

# Make sure everything is deleted
kubectl delete --all deployments,services,pods,configmap,persistentvolumes,persistentvolumeclaims --namespace=btd

# Create all pods
microservices=("postgres-db-microservice" "auth-microservice")
k8s_objects=("configmap" "volume" "claim" "deployment" "service")

for m in ${microservices[@]}; do
  for k in ${k8s_objects[@]}; do
    kubectl apply -f=submodules/$m/kubernetes/$k.yaml
  done
done

kubectl rollout restart deployment auth
kubectl rollout restart deployment postgres

docker-compose down # required to leave room for ports to be used in minikube

# Exec into your pods
# exec into pod - $ kubectl exec -it <pod> -- sh
# exec into psql - $ kubectl exec -it <pod> -- psql -h localhost -U user123 --password -p 5432 test_users

# To do:
# - Then read this and change things accordingly: https://medium.com/@subhampradhan966/deployment-of-a-three-tier-application-on-kubernetes-5fad942c6147 

