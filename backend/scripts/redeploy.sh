#!/bin/bash
docker-compose -f docker-compose.prod.yml build
for i in app postgres; do docker tag "circuit-design-$i" "eu.gcr.io/circuit-design-ru/circuit-design-$i" && docker push "eu.gcr.io/circuit-design-ru/circuit-design-$i"; done
kubectl delete pods --all -n circuit-design-stage
kubectl apply -Rf ../../kubernetes
