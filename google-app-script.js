
function afterFormSubmit(e) {
  const info = e.namedValues;
  const r = e.range;
  createPDF(info, r);
  //sendEmail("{vlam0001@gmail.com}", pdfFile);


  
}
/*

function sendEmail(email, pdfFile) {
  GmailApp.sendEmail(email, "New_incubator_submission_", "New_incubator_submission_", {
    attachements: [pdfFile],
    name: 'VLAM incubator gmail'
  });
}
*/
function createPDF(info, r) {

  const pdfFolder = DriveApp.getFolderById('1syqUA2yQ2Tey1kT1bCTaSag4vD4x8bdo');
  const tempFolder = DriveApp.getFolderById("1NA9piCnBZGopvZ_JUc46P9O2tFT7JuXS");
  const templateDoc = DriveApp.getFileById("1sDPRXo2CjtuxIjpndSoQAazLG0N0bgz3iyG_Gxz-sPs");

  const newTempFile = templateDoc.makeCopy(tempFolder);
  const openDoc = DocumentApp.openById(newTempFile.getId());
  const body = openDoc.getBody();
  /*
  body.replaceText("{Voornaam}", info['Voornaam'][0]);
  body.replaceText("{Achternaam}", info['Achternaam'][0]);
  body.replaceText("{date}", info['Tijdstempel'][0]);
  body.replaceText("{Bedrijfsnaam_hoofdaanvrager}", info['Bedrijfsnaam hoofdaanvrager'][0]);
  body.replaceText("{Bedrijfsnaam_mede-aanvragers}", info['Bedrijfsnaam mede-aanvragers (indien van toepassing)'][0]);
  body.replaceText("{Adres}", info['Adres'][0]);
  body.replaceText("{Ondernemingsnummer}", info['Ondernemingsnummer'][0]);
  body.replaceText("{Juridische_entiteit}", info['Juridische entiteit'][0]);
  body.replaceText("{Korte_beschrijving_link_vlam}", info['Korte beschrijving van link met landbouw/visserij/VLAM (200 tekens)'][0]);
  body.replaceText("{Functie}", info['Functie'][0]);
*/
  body.replaceText("{E-mail}", info['E-mailadres'][0]);
/*
  body.replaceText("{Telefoonnummer}", info['Telefoonnummer'][0]);
  body.replaceText("{Rekeningnummer}", info['Rekeningnummer waarop incubatorsteun mag gestort worden na goedkeuring'][0]);
  //body.replaceText("{Btw-verklaring}", info['Btw-verklaring: de onderneming verklaart niet/wel btw-plichtig te zijn en verklaart volgend aftrekpercentage te mogen toepassen (in %)'][0]);
  body.replaceText("{Reglement_op_de_steun_voor_de_exportincubato}", info['Reglement op de steun voor de exportincubator'][0]);
  body.replaceText("{Privacyreglement_op_www.vlam.be}", info['Privacyreglement op de site van VLAM'][0]);
  body.replaceText("{Cluster_van_meerdere_ondernemingen}", info['Cluster van meerdere ondernemingen en/of federatie'][0]);

  body.replaceText("{Brexit-impact}", info['Brexit-impact op uw bedrijf die u wil counteren met deze aanvraag  (15 punten, 500 tekens)'][0]);

  body.replaceText("{Beschrijving_uitvoering}", info['Beschrijving uitvoering actie/project (25 punten, 1800 tekens)'][0]);

  body.replaceText("{Doelstelling_en_manier}", info['Doelstelling en manier waarop deze gemeten wordt (15 punten, 500 tekens)'][0]);
  body.replaceText("{EI-eur}", info['Eigen inbreng in Euro'][0]);
  body.replaceText("{EI-%}", info['Eigen inbreng in %'][0]);
  body.replaceText("{IS-eur}", info['Incubatorsteun in Euro'][0]);
  body.replaceText("{IS-%}", info['Incubatorsteun in %'][0]);
  body.replaceText("{Detailbeschrijving_budget}", info['Detailbeschrijving budget (400 tekens)'][0]);
  body.replaceText("{Beschrijving_van_de_doelmarkt}", info['Beschrijving van de doelmarkt voor uw product/bedrijf (10 punten, 700 tekens)'][0]);
  body.replaceText("{Beschrijving_uitvoering}", info['Beschrijving uitvoering actie/project (25 punten, 1800 tekens)'][0]);
  body.replaceText("{Innovatief_karakter}", info['Innovatief karakter (proces, regio, klant …)   (5 punten, 400 tekens)'][0]);
  body.replaceText("{Verwachte_impact}", info['Verwachte impact  op langere termijn (5 punten, 300 tekens)'][0]);
  body.replaceText("{Doelstelling_meting}", info['Doelstelling en manier waarop deze gemeten wordt (15 punten, 500 tekens)'][0]);
  body.replaceText("{Risico-analyse}", info['Risico-analyse, Welke zaken kunnen zich voordoen die een negatieve impact hebben op uw project (10 punten, 500 tekens)'][0]);
  */
  
  openDoc.saveAndClose();

  const blobPDF = newTempFile.getAs(MimeType.PDF);
  const pdf_url = pdfFolder.createFile(blobPDF).setName("incubator "+ info['E-mailadres'][0]);
  //return pdfFile;
  //console.log(pdf_url);

   pdf_url.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
   const putPdfUrlInSheet = "http://drive.google.com/uc?export=view&id=" + pdf_url.getId();
     
    Logger.log(JSON.stringify(putPdfUrlInSheet));

  var newSS = SpreadsheetApp.openById("1nnUOJFuu74cjZPUuPp7Y7sRwhZ8ZouVo_Igc3bt0ljs");
  var sheet = newSS.getActiveSheet();
  sheet.appendRow([putPdfUrlInSheet,info['E-mailadres'][0]]);
  //sheet.appendRow([info['E-mailadres'][0]]);

} 





