from flask import Flask, request, jsonify, send_from_directory
import pikepdf
import os

app = Flask(__name__, static_folder='')

@app.route('/')
def serve_index():
    return send_from_directory('', 'index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        print("No file part in request")
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        print("No selected file")
        return jsonify({"error": "No selected file"}), 400
    if file:
        # Save the uploaded file
        file_path = "uploaded.pdf"
        file.save(file_path)
        print(f"File saved at {file_path}")
        
        # Crack the password
        password = crack_password(file_path)
        os.remove(file_path)  # Clean up the uploaded file
        
        if password:
            print(f"Password found: {password}")
            return jsonify({"password": password})
        else:
            print("Password not found")
            return jsonify({"error": "Password not found"}), 404

def crack_password(pdf_path):
    with open("wordlist.txt", "r") as file:
        for password in file:
            password = password.strip()
            print(f"Trying password: {password}")
            try:
                with pikepdf.open(pdf_path, password=password) as pdf:
                    return password
            except pikepdf.PasswordError:
                continue
    return None

if __name__ == '__main__':
    app.run(debug=True)