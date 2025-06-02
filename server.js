const express = require('express');
const fs = require('fs');
const soap = require('strong-soap').soap;
const http = require("http");
const taxService = require('./myTaxService');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000;
const wsdlPath = './wsdl/tax.wsdl';
const xml = fs.readFileSync(wsdlPath, 'utf8');

const server = http.createServer(app);
soap.listen(server, '/wsdl', taxService, xml);

server.listen(port, () => {
    console.log(`SOAP Tax Service running at http://localhost:${port}/wsdl`);
});