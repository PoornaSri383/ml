// express_app.js

// const express = require('express');
// const axios = require('axios');
// const app = express();
// const PORT = 3000;
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');
// app.use(express.json());

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + "/index2.html");
//   });

// app.get('/', function (req, res) {
//     res.sendFile(indexPath);
// });
// app.post('/makePrediction', async (req, res) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', req.body.file);

//     const flaskResponse = await axios.post('http://localhost:5000/predict', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     res.json(flaskResponse.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/makePrediction', async (req, res) => {
//     try {
//       const form = new FormData();
//       console.log(req.body);
    //   form.append('file', fs.createReadStream(req.body.file.path));
  
    //   const flaskResponse = await axios.post('http://localhost:5000/predict', form, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    //   });
  
    //   res.json(flaskResponse.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

// app.listen(PORT, () => {
//   console.log(`Express server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configure Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.get('/', function (req, res) {
    console.log(__dirname)
       res.sendFile(__dirname + '/templates/index2.html');
     });
app.post('/makePrediction', upload.single('file'), async (req, res) => {
    try {
        const form = new FormData();
        form.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const flaskResponse = await axios.post('http://localhost:5000/predict', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        res.json(flaskResponse.data);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});
