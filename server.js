const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const barchart = require("./routes/barChartRoutes");
const piechart = require("./routes/pieChartRoutes");

const app = express();
const port = 1000;


app.use('/transactions', transactionRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/barchart', barchart);
app.use('/piechart', piechart);

app.listen(port, () => {
 

    console.log(`Server is listening at http://localhost:${port}`);

  });