## Kayode Taiwo

# THE VEEGIL FICTITIOUS BANK API FOR NESTJS AND GRAPHQL.

# MORE DOCUMENTATION AND EXAMPLES COMING SOON BEFORE SUBMISSION DEADLINE. THANKS.

# ALSO STILL BUILDING THE FRONT END USING APOLLO ANGULAR. THANKS.

Fictitious banking application API implemented in NestJS and GraphQL as a GraphQL Server. This application was generated with the NestJS CLI (www.nestjs.com). This application has been deployed to the following url on Heroku:

[https://vbag.herokuapp.com/](https://vbag.herokuapp.com/)

With GraphQL playground available online also at:

[https://vbag.herokuapp.com/graphql](https://vbag.herokuapp.com/graphql)

## API Documentation

Coming soon. Have fun with GraphQL playground here:

[https://vbag.herokuapp.com/graphql](https://vbag.herokuapp.com/graphql)

## How to run the API locally from Source

01. Clone the app to a folder on your local computer, say vm-bank-api-graphql.
02. Navigate to the local folder by running, $ cd vm-bank-api-graphql.
03. Run the following command, $ npm install.
04. Run the following command, $ npm run start.
05. The GraphQL API is now available at http://localhost:3000 on your local computer.
05. The GraphQL API playground is now available at http://localhost:3000/graphql on your local computer.

## How to test the GraphQL API

01. Navigate to the GraphQL playground locally or at https://vbag.herokuapp.com/graphql
02. Login a user using a mutation:
   
    mutation {
	    loginUser(loginUserInput: {phone: "0834567654",password: "gbenga"}) {
        access_token
      }
    }

    response:

    {
      "data": {
        "loginUser": {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA4MzQ1Njc2NTQiL
          CJzdWIiOiI2MjUyNDNmZTlkN2QwOWI2NWUzMjQ0MWMiLCJpYXQiOjE2NDk2MjMwNDMsImV4cCI6MTY0OTYyNjY0M30.
          PN0n5Sl7u1J_J0aKWuJoemgIL0maytHD0jaT9ksHzJ0"
        }
      }
    }

03. Run a user query (make sure to set http headers to the token in step 02)

    query {
      user {
        _id
        phone
        fullName
        account {
          accountNo
          balance
          transactions {
            date
            amount
            balance
          }
        }
      }
    }

    response:

    {
      "data": {
        "user": {
          "_id": "625243fe9d7d09b65e32441c",
          "phone": "0834567654",
          "fullName": "Gbenga Komolafe",
          "account": {
            "accountNo": "0834567654",
            "balance": 0,
            "transactions": []
          }
        }
      }
    }

04. Make a deposit transaction on the account using a mutation (make sure to set http headers to the token in step 02)

    mutation {
	    depositAccount(transactAccountInput: {amount: 200}) {
        accountNo
        balance
        transactions {
          date
          amount
          balance
        }
      }
    }

    response:

    {
      "data": {
        "depositAccount": {
          "accountNo": "0834567654",
          "balance": 200,
          "transactions": [
          {
            "date": "2022-04-10T23:35:38.022Z",
            "amount": 200,
            "balance": 200
          }]
        }
      }
    }
    

# MORE DOCUMENTATION AND EXAMPLES COMING SOON BEFORE SUBMISSION DEADLINE. THANKS.






