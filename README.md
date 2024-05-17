# Product Installation

Step 1: Install Required Software

Ensure your system has the necessary software installed:

Node.js and npm: Download and install from Node.js official website.
Git: Download and install from Git official website.
React: Install React using npm by running npm install react in your terminal or visit the React official website for more information.

Step 2: Clone the Repository
Step 3: Configure the Software

This section guides you through setting up and using the environment variables necessary for the operation of the system.

Configuring Environment Variables

Create the .env File:
Create a file named .env in the root of your Node.js project to store your configuration settings.

Populate the .env File:
Add the following key-value pairs to your .env file:

MONGO_URI=mongodb+srv://hpass609:Hpass1234@cluster0.ekiwf4f.mongodb.net/HpassTask?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=AXnNfoXIoS8I1EtMVfFgXu6eHve4Io8v
JWT_LIFETIME=60d
SENDGRID_API_KEY=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
CLOUD_NAME=dbhoxr86e
CLOUD_API_KEY=823217554329151
CLOUD_API_SECRET=T5uTbxNXNVLm4ReOD44tIG5pBpk
ADMIN_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWU3ZjYwMmFmYTg1NjFhMDQ1MWRmMzYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzA5NzAwNjEwLCJleHAiOjE3MTQ4ODQ2MTB9.Qm-SfPdVHe2Vr3_02lXmytp9MUDv2941_j8WPGcSq5k
STRIPE_KEY=sk_test_51Oy4XrKDZmp8eDSbcz5UVe6EoGlwfgUnwfvIDi85pfSTQrj9OGktYWrz6flZG4rRuIaN8qS98zpoWqaY2oxsoW4r00gXwlo3RJ
OPENAI_API_KEY=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
            
Use Environment Variables in Your Application:
Load the .env file using the dotenv library and access these variables through process.env.VAR_NAME.

Secure Usage:
Never commit your .env file to source control. Instead, provide a .env.example with dummy values to guide setup.

Integrating Services:
Use the specified environment variables to configure services such as MongoDB, JWT, SendGrid, Cloudinary, Stripe, and OpenAI.

Step 4: Verify Installation

After starting both servers, visit http://localhost:3000 to check if the application is running properly.
