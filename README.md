# Trade Parsing and Balance Calculator

This is a server-side application built with Node.js and MongoDB that allows you to parse and store cryptocurrency trade data from a CSV file and retrieve asset-wise balances at a given timestamp.

## Features

- Parse and store trade data from a CSV file
- Retrieve asset-wise balances at a specific timestamp

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or remote instance)

## Installation

1. Clone the repository:
git clone https://github.com/bansita/koinXAssignment.git

3. Navigate to the project directory:
cd koinXAssignment

4. Install dependencies:
npm install

5. Create a `.env` file in the project root and add your MongoDB connection string.

## Usage

1. Start the server:
npm start

2. The server will automatically parse the `KoinX_Assignment_CSV_Sample.csv` file and store the trade data in the MongoDB database.
