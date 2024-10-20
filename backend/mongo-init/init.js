// mongo-init/init.js
db = db.getSiblingDB('inventory') // Switch to the inventory database
db.createCollection('items') // Create the inventory collection
db.createCollection('orders') // Create the order collection
