# I-Room Server

  Deploy Here:

[I-Room_Server](http://localhost:3000)

## API Documentation

----
  **Read All Room - Admin**
----
  View all room in I-Room app

* **URL**

  /room

* **Method:**

  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

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

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
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

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal server error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Read a Room by ID**
----
  Read a room by ID in I-Room app

* **URL**

  /room/update/:id

* **Method:**

  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <ROOM_ID> | true |

* **Data Params**

  None

* **Success Response:**


  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "101Room",
        "type": "Standard",
        "status": "Unoccupied",
        "UserId": null,
        "createdAt": "2020-07-10T01:32:28.627Z",
        "updatedAt": "2020-07-10T01:32:28.627Z"
    }
    ```

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal server error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Read a Room by ID**
----
  Read a room by ID in I-Room app

* **URL**

  /room/update/:id

* **Method:**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <ROOM_ID> | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <ROOM_NAME> | true |
  | type | <ROOM_TYPE> | true |

* **Success Response:**


  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "101Room",
        "type": "Deluxe",
        "status": "Unoccupied",
        "UserId": null,
        "createdAt": "2020-07-10T01:32:28.627Z",
        "updatedAt": "2020-07-10T02:16:25.896Z"
    }
    ```

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal server error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Delete a Room**
----
  Delete a room in I-Room app(Soft delete -> Change room status)

* **URL**

  /room/delete/:id

* **Method:**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <ROOM_ID> | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <ROOM_NAME> | true |
  | type | <ROOM_TYPE> | true |

* **Success Response:**


  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "101Room",
        "type": "Deluxe",
        "status": "Unoccupied",
        "UserId": null,
        "createdAt": "2020-07-10T01:32:28.627Z",
        "updatedAt": "2020-07-10T02:16:25.896Z"
    }
    ```

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal server error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Read All Room - Customer**
----
  View all room(Customer view) in I-Room app

* **URL**

  /booking

* **Method:**

  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

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

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Booking a Room**
----
  Booking a room in I-Room app

* **URL**

  /room/booking/:id

* **Method:**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <ROOM_ID> | true |

* **Data Params**

  None

* **Success Response:**


  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "101Room",
        "type": "Deluxe",
        "status": "Occupied",
        "UserId": 2,
        "createdAt": "2020-07-10T01:32:28.627Z",
        "updatedAt": "2020-07-10T02:52:09.193Z"
    }
    ```

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "message" : "You don't have permission to access" }
        ```

    OR

    * **Code:** 500 Internal server error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```