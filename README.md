# NodeJs server for FHIR R4 REST API for Patient and Claim resources

1. Implement a Restful API to support CRUD operations on the https://www.hl7.org/fhir/ for Patient and Claim resources. For the simplicity only small subset of fields was included in the Database schema to represent Patient-Claim interaction, some fields that are described as an object (for example Address) are simplified to the string, for fields that have array of values such as Patient Name use only first element in the array if any.
2. Design and implement a database schema (preferable SQL, provide explanation if using another type of database) for the above resources using Postgres and Sequelize.
3. Search API that returns the related resources for the provided patient ID

## Features

* Babel 7
* Express
* REST API
* PostgreSQL
* [FHIR](http://www.hl7.org/FHIR/index.html)

## Requirements

* [node & npm](https://nodejs.org/en/)

## Database

```bash
brew install postgresql
brew services start postgresql
psql postgres
```

```sql
CREATE ROLE fhirr4 WITH LOGIN PASSWORD 'password';
ALTER ROLE fhirr4 CREATEDB;
CREATE DATABASE api;
GRANT ALL PRIVILEGES ON DATABASE api TO fhirr4;
```

```bash
psql -d api -U fhirr4

## Installation

* `git clone git@github.com:liana-soghomonyan/fhir-r4-server.git`
* `cd fhir-r4-server`
* `npm install`
* `npm start`
* optional: include *.env* in your *.gitignore*

### GET Routes

* visit http://localhost:3000
  * /patient
  * /patient/:patientId
  * /claim
  * /claim/:claimId
  * /claim/patient/:patientId
### Beyond GET Routes

#### TEST CRUD APIs via CURL

* Create a patient with:
    Patient/1
  * `curl -X POST -H "Content-Type:application/json" http://localhost:3000/patient -d '{"resourceType": "Patient","birthDate": "2010-10-10","name": [{"use": "official","family": "Silver","given": ["Ben"]}], "gender": "other"}'`
    Patient/2
  * `curl -X POST -H "Content-Type:application/json" http://localhost:3000/patient -d '{"resourceType": "Patient","birthDate": "2009-10-09","name": [{"use": "official","family": "Donald","given": ["Duck"]}], "gender": "other"}'`

* Update a patient with:
  * `curl -X PUT  -H "Content-Type:application/json" http://localhost:3000/patient/1 -d '{"resourceType": "Patient","address": "Broadway 100, NY, NY"}'`
  * `curl -X PUT  -H "Content-Type:application/json" http://localhost:3000/patient/2 -d '{"resourceType": "Patient","address": "Broadway 219, NY, NY","gender": "male"}'`
  * `curl -X PUT  -H "Content-Type:application/json" http://localhost:3000/patient/2 -d '{"resourceType": "Patient","gender": "male"}'`

* Delete a message with:
  * `curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/patient/2`

* Create a claim with:
   Claim/1 for Patient/1
  * `curl -X POST -H "Content-Type:application/json" http://localhost:3000/claim -d '{"resourceType": "Claim", "type": {"coding": [{"code": "vision"}]}, "use": "claim", "patient": {"reference": "Patient/1"}, "insurer": {"reference": "Organization/7"},"provider": {"reference": "Organization/1"}, "total": {"value": 100.57, "currency": "USD"}}'`
   Claim/1 for Patient/1
  * curl -X POST -H "Content-Type:application/json" http://localhost:3000/claim -d '{"resourceType": "Claim", "type": {"coding": [{"code": "oral"}]}, "use": "claim", "patient": {"reference": "Patient/1"}, "insurer": {"reference": "Organization/8"},"provider": {"reference": "Organization/2"}, "total": {"value": 200.57, "currency": "USD"}}'`
   Claim/1 for Patient/2
  * `curl -X POST -H "Content-Type:application/json" http://localhost:3000/claim -d '{"resourceType": "Claim", "type": {"coding": [{"code": "vision"}]}, "use": "claim", "patient": {"reference": "Patient/2"}, "insurer": {"reference": "Organization/7"},"provider": {"reference": "Organization/3"}, "total": {"value": 1000, "currency": "USD"}}'`
   Claim/1 for Patient/2
  * curl -X POST -H "Content-Type:application/json" http://localhost:3000/claim -d '{"resourceType": "Claim", "type": {"coding": [{"code": "oral"}]}, "use": "claim", "patient": {"reference": "Patient/2"}, "insurer": {"reference": "Organization/7"},"provider": {"reference": "Organization/3"}, "total": {"value": 2000, "currency": "USD"}}'`

* Update a clime with:
  * `curl -X PUT -H "Content-Type: application/json" http://localhost:3000/claim/1 -d '{"resourceType": "Claim", "type": {"coding": [{"code": "professional"}]}, "use": "preauthorization",  "insurer": {"reference": "Organization/8"},"provider": {"reference": "Organization/2"}, "total": {"value": 999, "currency": "USD"}}'`

* Delete a claim with:
  * `curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/claim/2``

