# BlendNet.ai Stock Watchlist Platform

This project is aimed at building a stock watchlist platform that allows users to create and manage their own watchlists of stock symbols (e.g., MSFT, GOOG). The platform displays a dashboard with the latest stock values of the symbols on the user's watchlist. It is designed to handle multiple users concurrently, each having different watchlists. The platform uses a database of your choice (e.g., MySQL, PostgreSQL, MongoDB) to store user and watchlist data and employs a secure and simple authentication mechanism for users. The stock information is pulled from the [Alpha Vantage](https://www.alphavantage.co) API, using the TIME_SERIES_INTRADAY endpoint to show the latest stock prices.

## Features

* Create and manage personalized watchlists of stock symbols.
* Display a dashboard with the latest stock values for symbols in the user's watchlist.
* Handle multiple users concurrently, each with their own watchlists.
* Use a database to store user and watchlist data.
* Secure and simple user authentication.
* Integrate with the Alpha Vantage API for real-time stock data.

## Technologies Used

* **Frontend:** React.js with TypeScript
  * **Benefits of TypeScript:** Provides static type checking, enhances code quality, and improves developer productivity by catching errors early in the development process.
* **Backend:** Django
  * **REST API:** Django REST Framework is used to create robust and scalable APIs.
* **Database:** Choice of MySQL, PostgreSQL, or MongoDB

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Python 3.x
* Node.js and npm
* A database (e.g., MySQL, PostgreSQL, MongoDB)

### Installation

1. **Clone the repository:**

    ```bash
    
    git clone https://github.com/DhirajsGithub/stock_watchlist
    cd stock_watchlist
    ```

2. **Set up the backend:**

    a. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

    b. Activate the virtual environment:

    * On Windows:

    ```bash
    venv\Scripts\activate
    ```

    * On macOS/Linux:

    ```bash
    source venv/bin/activate
    ```

    c. Install the backend dependencies:

    ```bash
    cd backend
    pip install -r requirements.txt
    ```

    d. Start the backend server:

    ```bash
    python manage.py runserver
    ```


3. **Set up the frontend:**

    ```
    git clone git clone https://github.com/DhirajsGithub/stock_watchlist_client
    ```
    a. Navigate to the client directory:

    ```bash
    cd stock_watchlist_client
    ```

    b. Install the frontend dependencies:

    ```bash
    npm install
    ```

    c. Start the frontend server:

    ```bash
    npm start
    ```

## Workflow

1. **Login Page:**
   * The initial page shown to the user is the login page.
   * If the user is not registered, they need to sign up.
   * After a successful login, an access token is stored which is used to call all subsequent APIs.

2. **Dashboard:**
   * After login, the user is redirected to the dashboard.
   * Users can search for a stock symbol and either visit the stock's details page or add it to their watchlist.
   * The dashboard displays a list of all watchlists created by the user.

3. **Watchlist Management:**
   * Clicking on any watchlist redirects the user to a page displaying all stocks in that watchlist.
   * Users can manage their watchlists by adding or removing stocks.

## Database Setup

* Configure your chosen database (e.g., MySQL, PostgreSQL, MongoDB) and update the connection settings in the backend configuration.

## API Integration

* The platform uses the Alpha Vantage API to fetch stock data. Ensure you have an API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) and update the backend configuration with this key.

## Security

* The platform uses a secure and simple authentication mechanism. Ensure you follow best practices for storing and managing user credentials.

