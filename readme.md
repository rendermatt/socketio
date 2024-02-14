# Simple Chat Application

This is a simple chat application using Node.js, Express, and Socket.IO. The application allows users to join a chat room, send messages to all users, and send private messages to specific users.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mearjuntripathi/chat-example.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chat-example
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Run the server:

    ```bash
    npm start
    ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000).

3. Enter your name and join the chat room.

4. Start chatting with other users.

## Features

- **Joining and Leaving:**
  - Users can join the chat room by entering their name.
  - When a user joins, a broadcast message notifies all users about the new user.
  - Users receive a message when someone leaves the chat room.

- **Public Chat:**
  - Users can send messages that are broadcasted to all connected users.

- **Private Messaging:**
  - Users can send private messages to a specific user by selecting their name.

## Technologies Used

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web application framework for Node.js.
- **Socket.IO:** Real-time bidirectional event-based communication.

## File Structure

- **`/html`:** Contains HTML files for the front end.
- **`/html/public`:** Static assets like stylesheets and client-side scripts.
- **`index.html`:** Main HTML file for the chat application.
- **`app.js`:** Server-side script for handling socket connections and messages.

## Socket.IO Documentation

Socket.IO enables real-time, bidirectional, and event-based communication. It works on every platform, browser, or device, focusing equally on reliability and speed.

- **[Socket.IO Documentation](https://socket.io/docs/):** Refer to the official Socket.IO documentation for detailed information on using Socket.IO.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.