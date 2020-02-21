# Next Atomic Server

![CI](https://github.com/Moumouls/next-atomic-gql-server/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/Moumouls/next-atomic-gql-server/branch/master/graph/badge.svg)](https://codecov.io/gh/Moumouls/next-atomic-gql-server)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=alert_status)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=bugs)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=code_smells)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=ncloc)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=alert_status)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=security_rating)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=sqale_index)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Moumouls_next-atomic-gql-server&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=Moumouls_next-atomic-gql-server)

## Install

`yarn`

## Dev

`yarn dev`

## Schemas

You can create/edit/delete schemas into `./src/schema/schemas`

## Code Quality/Security: Local SonarQube

You need to have Docker installed on your system, then you can run `yarn sonarqube` (need to be launched once for your entire system/projects).
To run a scan `yarn scan` results are available at [http://localhost:9000](http://localhost:9000)

## Kubernetes/Rancher

You can find some example files (that you need to modify) of `deployment.yml` and a `.rancher-pipeline.yml`.
The deployment file do not cover the creation of the MongoDB database
