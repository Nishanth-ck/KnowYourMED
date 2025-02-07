KnowYourMED - A Full Stack Q.R Code Application for Smarter Medication Management

This project was developed as part of my College's 5th semester Mini Project Subject Course. I contributed to my team by developing the frontend of this project.

KnowYourMED is a smart, full-stack web application designed to enhance medicine safety by detecting expiry dates and counterfeit medicines using QR code technology. By simply scanning a QR code on medicine packaging, users can access detailed medicine information and receive real-time notifications via email before their medication expires. The system is built with multilingual support, ensuring accessibility for diverse users, including those in rural areas. With a focus on health security, user engagement, and counterfeit prevention, KnowYourMED aims to revolutionize medication management, reduce health risks, and promote safer pharmaceutical practices. 🚀

How to setup this project on VSCode : 

a) Open command prompt or Git Bash and Go to the required folder on your system

b) Type : "git clone https://github.com/Nishanth-ck/KnowYourMED.git" and clone the repository

c) Create a .env file in the backend folder and set the following variables : 
    1)PORT ----- the port no,
    2)MONGO_URL ----- the mongodb atlas url,
    3)SEC_ACC ----- some random string,
    4)SEC_REF ----- some random string,
    5)EMAIL_PASS ----- generated for a gmail account to be used . (Use Ctrl+Shift+F to replace the gmail account : webdevelepor001nishanth@gmail.com with your required gmail account)
    (go to google account -> security -> 2 step verification -> app passwords in search bar -> 'nodemailer' -> get the pass key )
  
d)To run the project :
  Use two terminals :
    cd frontend -> npm install --legacy-peer-deps -> npm run dev -> it will start on : http://localhost:5173/
    cd backend -> npm install -> npm start -> it will start on : http://localhost:3000/ (the port number)
