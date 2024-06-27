# Non-Hashed-Password-pdf-cracker
Non-Hashed Password PDF Cracker This project is a web-based application designed to crack passwords for PDF files using a non-hashed password list. The implementation features a user-friendly interface with a drag-and-drop functionality and a visual matrix rain effect inspired by the movie "The Matrix".

Project Structure
index.html: The main HTML file that provides the structure for the web page. It includes the drag-and-drop area for PDF files, an upload button, and a list of uploaded files.

styles.css: The CSS file for styling the web page. It includes styles for the body, container, header, drop area, file list, and other elements to create a visually appealing interface.

script.js: The JavaScript file that handles the front-end functionality. It includes the matrix rain effect, drag-and-drop functionality, file upload handling, and interaction with the server.

server.py: A Python server script using Flask. It handles the file upload, saves the PDF file, attempts to crack the password using a wordlist, and returns the result to the client.

wordlist.txt: A text file containing a list of potential passwords used for cracking the PDF files.

Features
Matrix Rain Effect: An eye-catching background effect that mimics the falling code from "The Matrix".
Drag-and-Drop Upload: Users can drag and drop their PDF files into a designated area to initiate the upload process.
File Upload: A button is provided for users to manually upload their PDF files.
Password Cracking: The server attempts to crack the password of the uploaded PDF using a predefined wordlist.
Results Display: The application notifies the user if the password is found or if an error occurs.
Usage
Setup: Ensure you have Python and Flask installed. Place all files in the same directory.
Run the Server: Start the server by running python server.py.
Access the Application: Open your web browser and navigate to http://127.0.0.1:5000/.
Upload PDF: Drag and drop a PDF file or use the upload button to select a file.
Crack Password: The server will attempt to crack the password using the wordlist and display the result.
Technical Details
Front-End: HTML, CSS, and JavaScript for the user interface and interactivity.
Back-End: Python with Flask for handling file uploads and password cracking.
Password Cracking: Utilizes the pikepdf library to attempt opening the PDF with each password from the wordlist.
