// src/components/GoogleSheet.js
import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const SPREADSHEET_ID = '1jJHwbHeieYwkqp6Iz-XkRq8LUGTn7MtLUAnRi_BbZsU';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

const GoogleSheet = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: SCOPE,
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleSignInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const appendDataToSheet = () => {
    const range = 'Sheet1!A1'; // Specify the range in your sheet
    const valueInputOption = 'RAW';
    const values = [['Hello', 'World']]; // Data to be appended

    const body = {
      values: values,
    };

    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: valueInputOption,
      resource: body,
    }).then((response: any) => {
      console.log(`${response.result.updates.updatedCells} cells appended.`);
    });
  };

  return (
    <div>
      <button onClick={handleSignInClick}>Sign In</button>
      <button onClick={handleSignOutClick}>Sign Out</button>
      <button onClick={appendDataToSheet}>Append Data to Sheet</button>
    </div>
  )
};

export default GoogleSheet;
