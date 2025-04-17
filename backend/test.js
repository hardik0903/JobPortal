const express = require('express');
const cors  = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/client", require('./routes/clientAPI'));

app.listen(3001, () => {

});

const express = require('express');
const router = express.Router();

router.post("/SignIn", (req, res) => {
    try {
        res.json({message : "petit message", token:"token"});
    } catch(error){
        res.status(500).json({error :"ceci est une erreur"})
    }
});
