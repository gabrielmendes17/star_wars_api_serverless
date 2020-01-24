### StarWarsApiServerless

##### Instructions
After config your <b>aws</b> credentials on machine.<br />
Run the commands below to setup the project.
###### TERRAFORM
  To deploy the api infrastructure:<br />
    Inside directory terraform / environment / dev<br />
    run the commands:<br />
      <b>terraform init</b><br />
      <b>terraform apply</b>

###### API-NODEJS
Inside directory api-nodejs /<br />
  To run both unitary and integration tests run:<br />
    <b>npm run test-all</b><br />

  To deploy lambda functions:<br />
  run the command:<br />
    <b>sls deploy</b>
