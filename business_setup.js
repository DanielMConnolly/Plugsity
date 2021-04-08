const express = require("express");
const { connection } = require("./db");
const router = express.Router();

router.post("/business", async (req, res) => {
    
   connection.query("USE Plugsity");
    const { legal_business_name,
        legal_business_address,
        legal_business_phone,
        legal_business_email,
        business_link,
        shipping_policy,
        return_policy,
        tax_id,
        business_form,
        business_license_link,
        business_permit_link,
        language,
        country,
        currency,
        business_type,
        business_description } = req.body;
        const user_id = 53;
        
    const query = `INSERT INTO Plugsity.BusinessPage (user_id, legal_business_name,legal_business_address,legal_business_phone,
legal_business_email,business_link,shipping_policy,return_policy, tax_id, business_form, business_license_link, business_permit_link,
language, country, currency, business_type, business_description) VALUES('${user_id}','${legal_business_name}',
'${legal_business_address}', '${legal_business_phone}', '${legal_business_email}', '${business_link}', '${shipping_policy}', '${return_policy}',
'${tax_id}', '${business_form}', '${business_license_link}', '${business_permit_link}', '${language}', '${country}', '${currency}', '${country}', '${business_description}')`;

        connection.query(query, (error, results, fields) => {
            if (error) res.send(error)
            if (results) res.json(results)
            if (fields) console.log(fields)
        })
    
})

module.exports = router;
