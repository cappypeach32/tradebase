const express = require('express');
const router = express.Router();

let alerts = [];

// Create alert
router.post('/', (req,res)=>{
    const alert = { id: alerts.length+1, ...req.body, active:true };
    alerts.push(alert);
    res.json(alert);
});

// Get user alerts
router.get('/user/:user_id', (req,res)=>{
    const userAlerts = alerts.filter(a=>a.user_id==req.params.user_id);
    res.json(userAlerts);
});

// Update alert
router.put('/:id', (req,res)=>{
    const alert = alerts.find(a=>a.id==req.params.id);
    if(alert) Object.assign(alert, req.body);
    res.json(alert);
});

// Delete alert
router.delete('/:id', (req,res)=>{
    alerts = alerts.filter(a=>a.id!=req.params.id);
    res.json({ message:'Alert deleted' });
});

module.exports = router;
