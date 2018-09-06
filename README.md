# Code Challenge Notice, Instructions & Rules
Re: Competition "Data Driven Mine Development - Team Expansion" (the “RFP”)

Government Contact: andrew.l.sutherland@gov.bc.ca 

This notice is dated September 16, 2018 (the “Notice Date”).

Congratulations - you are a Shortlisted Proponent eligible to participate in the Code Challenge (Step 4 of the evaluation process described on the Evaluation tab of the RFP).
## Rules and Instructions
Please be advised of the following rules and instructions:
1. These code challenge rules and instructions apply only to Shortlisted Proponents and are part of the RFP.
2. Shortlisted Proponents will have no less than five (5) Business Days from the Notice Date to complete the code challenge. The deadline to complete the code challenge in accordance with these rules is 4:00 p.m. Pacific Time on Friday, June 15, 2018 (the “Deadline”).
3. The Shortlisted Proponent’s code challenge submission Deliverable (defined below) must be received by the Province (as provided for by these instructions) and be deposited and located in the applicable Repository before the Deadline, failing which such submission will not be eligible for evaluation and the associated Shortlisted Proponent Proposal will receive no further consideration and such Shortlisted Proponent will be eliminated from the RFP competition.
4. Only the Proponent Resources that were put forward in a Shortlisted Proponent’s RFP Proposal are eligible to participate in the Code Challenge.
5. The Shortlisted Proponent Resources will be sent invites via GitHub to join this private repository ([INSERT PRIVATE REPO]). Please forward to the Government Contact the GitHub handles of those Proponent Resources who will be taking part in the Code Challenge.
6. As of the Notice Date, the code challenge issue has been created in this private repository ([INSERT PRIVATE REPO]), under the "BCDevExchange-CodeChallenge" organization.
7. Shortlisted Proponents may direct clarifying questions to the Government
Contact. Any such questions must be received by the Government Contact
before 4:00 p.m. Pacific time on Wednesday, June 13, 2018 (the “Code Challenge Questions
Deadline”).
8. The Province reserves the right to amend this notice before or after the Closing
Time, including changing the Deadline or the Code Challenge Questions
Deadline upon notice to all Shortlisted Proponents.
9. The Shortlisted Proponent must complete all of the following tasks and
Deliverable and as such they must be deposited and received in the applicable
Repository by the Province in the form specified by this notice before the
Deadline:
* Complete all code changes required to complete the code challenge (the "Deliverable"); and
* Attach an Apache License 2.0 to the Deliverable.
10. The rules and instructions set forth in this notice are in addition to any rules,
terms and conditions set forth elsewhere in the RFP.

# Code Challenge (Mines)

## Description

Included are scripts for building and running one Docker container: 
* A Postgres database loaded with the sample schema and data

The scripts handle retrieval of the appropriate images, loading of the sample data, and setting of default user credentials.

## Requirements

* Docker

## Getting Started

* Run the included ```start.sh``` script to launch the containers.
* The Postgres container exposes port 5432 and can be connected to with either the admin account (postgres/postgresadmin) or the read-only user account (pguser/pguser)
* Feel free to change the default admin and user account credentials
* You can verify the containers are running using the command ```docker container ls | grep code-challenge``` or by connecting to each one using your favourite client tool (e.g. Postico)

## Code Challenge Instructions

TBD
