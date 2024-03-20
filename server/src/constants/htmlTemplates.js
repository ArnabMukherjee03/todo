const registerTemplate = ({ name }) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
    
    <div class="max-w-screen-md mx-auto p-6 bg-white rounded shadow-md">
        <h1 class="text-2xl text-center font-bold mb-4">Registration Successful!</h1>
        <p class="text-center text-gray-700 mb-4">Dear ${name},</p>
        <p class="text-center text-gray-700 mb-4">Your registration has been successfully completed. You are now a member of our community. Thank you for joining!</p>
        <p class="text-center text-gray-700 mb-4">If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@example.com" class="text-blue-500">support@example.com</a>.</p>
        <p class="text-center text-gray-700">Best regards,<br> The Example Team</p>
    </div>
    
    </body>
    </html>
    `;
};

const forgotPassEmail = ({ name, resetLink, validity }) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100 p-4">
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <p class="text-lg font-semibold mb-4">Dear ${name},</p>
            <p class="mb-4">We received a request to reset your password. If you did not make this request, you can ignore this email.</p>
            <p class="mb-4">To reset your password, please click on the link below:</p>
            <a href='${resetLink}' class="block bg-blue-500 text-white px-4 py-2 rounded-md text-center mb-4 hover:bg-blue-600">Reset Password</a>
            <p class="mb-4">This link is valid for ${validity}.</p>
            <p>Thank you!</p>
        </div>
    </body>
    </html>
    `;
};

const updatepass = () => {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Updated Successfully</title>
        <style>
            body {
                background-color: #f3f4f6;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
            }
    
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
                text-align: center;
            }
    
            h2 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
    
            p {
                color: #666;
                margin-bottom: 20px;
            }
    
            .return-link {
                background-color: #3b82f6;
                color: #fff !important;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                transition: background-color 0.3s ease;
            }
    
            .return-link:hover {
                background-color: #2980b9;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2>Password Updated Successfully</h2>
            <p>Your password has been successfully updated.</p>
            <a href="http://localhost:3000/login" class="return-link">Return to Login</a>
        </div>
    </body>
    
    </html>
    `;
};

module.exports = {
  registerTemplate,
  forgotPassEmail,
  updatepass,
};
