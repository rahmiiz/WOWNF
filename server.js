const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware JSON
app.use(express.json());

// CORS (biar bisa fetch dari mana aja)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint POST /submit
app.post('/submit', (req, res) => {
  const data = req.body;

  const filePath = path.join(__dirname, 'data.json');
  let existingData = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent) {
      existingData = JSON.parse(fileContent);
    }
  }

  existingData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

  console.log("Data diterima:", data);
  res.status(200).send('Data berhasil disimpan');
});

// Mulai server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

});
