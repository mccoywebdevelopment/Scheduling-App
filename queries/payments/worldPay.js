


// const url = 'https://certtransaction.elementexpress.com';
// const sampleHeaders = {
//   'Content-Type': 'text/xml;charset=UTF-8',
// };
// const xml1 = `<?xml version="1.0"?>
// <TokenCreate xmlns="https://services.elementexpress.com">
//   <Credentials>  
//     <AccountID>1102386</AccountID>  
//     <AccountToken>F8A018644B595930D5C1A596A10516A26AD39A322BAA5736CB3CA2DD31DF0109A9D43001</AccountToken>  
//     <AcceptorID>3928907</AcceptorID>  
//   </Credentials>  
//   <Application>  
//     <ApplicationID>10532</ApplicationID>  
//     <ApplicationVersion>1.0</ApplicationVersion>   
//     <ApplicationName>Express.CSharkjhkjhkjp</ApplicationName>  
//   </Application>  
//   <Card>
//       <CardNumber>5555555555554444</CardNumber>
//       <ExpirationMonth>3</ExpirationMonth>
//       <ExpirationYear>22</ExpirationYear>
//   </Card>
//   <Token>
//     <TokenProvider></TokenProvider>
//   </Token>
// </TokenCreate>`;

// const xml2 = `<?xml version="1.0"?>
// <TokenCreate xmlns="https://transaction.elementexpress.com">
//   <Credentials>  
//     <AccountID>1102386</AccountID>  
//     <AccountToken>F8A018644B595930D5C1A596A10516A26AD39A322BAA5736CB3CA2DD31DF0109A9D43001</AccountToken>  
//     <AcceptorID>3928907</AcceptorID>  
//   </Credentials>  
//   <Application>  
//     <ApplicationID>10532</ApplicationID>  
//     <ApplicationVersion>1.0</ApplicationVersion>   
//     <ApplicationName>Express.CSharkjhkjhkjp</ApplicationName>  
//   </Application>  
//   <Card>
//       <CardNumber>5555555555554444</CardNumber>
//       <ExpirationMonth>3</ExpirationMonth>
//       <ExpirationYear>22</ExpirationYear>
//   </Card>
//   <Token>
//     <TokenProvider></TokenProvider>
//   </Token>
// </TokenCreate>`

// (async () => {
//   const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml1, timeout: 1000 }); // Optional timeout parameter(milliseconds)
//   const { headers, body, statusCode } = response;
//   console.log(headers);
//   console.log(body);
//   console.log(statusCode);
//})();
