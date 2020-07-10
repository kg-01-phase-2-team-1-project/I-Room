# I-Room Server

  Deploy Here:

[I-Room_Server](http://localhost:3000)

## API Documentation

----
  **Read All Room**
----
  View all room in I-Room app

* **URL**

  /room

* **Method:**

  `GET`

* **Request Headers**

  None

* **URL Params**

  None

* **Data Params**

  None

* **Success Response:**


  * **Code:**200 OK <br />
    **Content:**
    ```json
    [
        {
            "id": 1,
            "name": "101Room",
            "type": "Standard",
            "status": "Unoccupied",
            "UserId": null,
            "createdAt": "2020-07-10T01:32:28.627Z",
            "updatedAt": "2020-07-10T01:32:28.627Z"
        },
        {
            "id": 2,
            "name": "102Room",
            "type": "Standard",
            "status": "Unoccupied",
            "UserId": null,
            "createdAt": "2020-07-10T01:33:11.661Z",
            "updatedAt": "2020-07-10T01:33:11.661Z"
        }
    ]
    ```

* **Error Response:**

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal server error" }
        ```

----
  **Create a Room**
----
  Create a new room in I-Room app

* **URL**

  /room/add

* **Method:**

  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | Token | <USER_TOKEN> | true |

* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <ROOM_NAME> | true |
  | type | <ROOM_TYPE> | true |

* **Success Response:**


  * **Code:**201 Created <br />
    **Content:**
    ```json
    {
        "newRoom": {
            "id": 2,
            "name": "102Room",
            "type": "Standard",
            "updatedAt": "2020-07-10T01:33:11.661Z",
            "createdAt": "2020-07-10T01:33:11.661Z",
            "status": "Unoccupied",
            "UserId": null
        }
    }
    ```

* **Error Response:**

    * **Code:** 500 Internal server error <br />
        **Content:** 
        ```json
        { "message" : "Internal server error" }
        ```

 