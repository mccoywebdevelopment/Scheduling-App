const express = require('express');
const configVars = require('./config/variables');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || configVars.PORT;
const CustomerRoute = require('./routes/customer');
const ServiceTypeRoute = require('./routes/servicetype');
const SubscriptionRoute = require('./routes/subscription');
const AppointmentRoutes = require('./routes/appointment');
const PestProblemRoutes = require('./routes/pestProblem');
const CheckoutRoutes = require('./routes/checkout');
const SpotRoutes = require('./routes/spot');
const { authenticateToken } = require('./config/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if(process.env.NODE_ENV ==='production'){
    const root = require('path').join(__dirname, 'client', 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    });
    app.get("/*", (req, res) => {
        res.sendFile('index.html', { root });
    });
}

//=============DELETE IN PROD==========
if(process.env.NODE_ENV !='production'){
    const cors = require('cors');
    app.use(cors());
    app.use('/api',require('./routes/test'));
}
app.use('/api',require('./routes/test'));
//=====================================

app.get('/api',function(req,res){
    res.send("success");
});

app.use('/api/customer',CustomerRoute);
app.use(authenticateToken);
app.use('/api/service-type',ServiceTypeRoute);
app.use('/api/subscription',SubscriptionRoute);
app.use('/api/spot',SpotRoutes);
app.use('/api/checkout',CheckoutRoutes);
app.use('/api/pest-problem',PestProblemRoutes)
app.use('/api/appointment',AppointmentRoutes);

// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send('Something broke! Please contact customer support.');
// });


app.listen(PORT,function(req,res){
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPestRouteAPI Scheduling is running at http://localhost:'+PORT);
    console.log('Press CTRL-C to stop\n');
});