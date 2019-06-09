#!/bin/bash
docker-compose -f docker-compose.prod.yml build
for i in app postgres; do docker tag "dreamsim-$i" "eu.gcr.io/dreamsim-ru/dreamsim-$i" && docker push "eu.gcr.io/dreamsim-ru/dreamsim-$i"; done
kubectl delete pods --all -n dreamsim-stage
kubectl apply -Rf ../../kubernetes
