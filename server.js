const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// CORS (biar bisa fetch dari file HTML yang dibuka langsung)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
