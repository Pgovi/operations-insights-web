/**
 * Backend for the Operations Insights website forms (Contact form + FinOps AI waitlist).
 *
 * SETUP
 * 1. Go to https://sheets.new to create a blank Google Sheet.
 * 2. In the Sheet, open Extensions > Apps Script.
 * 3. Delete any starter code and paste this entire file in.
 * 4. Click Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the requested permissions, and copy the Web app URL
 *    (it ends in /exec).
 * 6. Paste that URL into SCRIPT_URL near the top of script.js in this repo.
 *
 * This script appends every submission to the Sheet (on separate "Contact" and
 * "Waitlist" tabs, created automatically) and emails a copy to NOTIFY_EMAIL.
 */

var NOTIFY_EMAIL = 'infra@operations-insights.in';

function doPost(e) {
  var params = e.parameter;
  var source = params.source === 'waitlist' ? 'waitlist' : 'contact';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var timestamp = new Date();

  if (source === 'waitlist') {
    var sheet = getOrCreateSheet(ss, 'Waitlist', ['Timestamp', 'Name', 'Company', 'Mobile', 'Email']);
    sheet.appendRow([
      timestamp,
      params.name || '',
      params.company || '',
      params.mobile || '',
      params.email || ''
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New FinOps AI waitlist signup',
      body:
        'New waitlist signup:\n\n' +
        'Name: ' + params.name + '\n' +
        'Company: ' + params.company + '\n' +
        'Mobile: ' + params.mobile + '\n' +
        'Email: ' + params.email + '\n' +
        'Time: ' + timestamp
    });
  } else {
    var sheet = getOrCreateSheet(ss, 'Contact', ['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
    sheet.appendRow([
      timestamp,
      params.name || '',
      params.email || '',
      params.subject || '',
      params.message || ''
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: params.email || NOTIFY_EMAIL,
      subject: 'New contact form message: ' + (params.subject || 'No subject'),
      body:
        'New contact form submission:\n\n' +
        'Name: ' + params.name + '\n' +
        'Email: ' + params.email + '\n' +
        'Subject: ' + params.subject + '\n\n' +
        'Message:\n' + params.message + '\n\n' +
        'Time: ' + timestamp
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name, headerRow) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headerRow);
    sheet.getRange(1, 1, 1, headerRow.length).setFontWeight('bold');
  }
  return sheet;
}
