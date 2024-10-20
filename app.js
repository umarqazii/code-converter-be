const express = require('express');
const dotenv = require('dotenv');
const codeConverterRoutes = require('./routes/codeConverterRoutes');
const cors = require('cors'); 


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/', codeConverterRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
