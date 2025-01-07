export async function GET() {
  const config = {
    accountAssociation: {
      header:
        'eyJmaWQiOjc5ODgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg1MUQ0NDZFOTNhMTcxZGQxMkY4NGI3NWE4RDFCNjgyNTVGN2MxRjgyIn0',
      payload: 'eyJkb21haW4iOiJlbmpveXIudmVyY2VsLmFwcCJ9',
      signature:
        'MHg0MmYyMDE4ZTc5ZjQ3ZTkwNmM1NWNkOGU5NmMzODBmYjU1OGNjZmRjZjc2MjhlNWY0ZTg0NDQ0NDJmODNkODI0MDMxODRlNDc2OGE1NzI2NTA4MjBmMTg5MmZhNWI0ZTQzMTg2ZjA4YTcyZjQwMTRiY2Q3MTZiYTU4ZGI0ZTFjODFj',
    },
    frame: {
      version: '1',
      name: 'Enjoyr (Zora Network)',
      iconUrl: 'https://enjoyr2.vercel.app/logo.png',
      homeUrl: 'https://enjoyr2.vercel.app',
      imageUrl: 'https://enjoyr2.vercel.app/logo.png',
      buttonTitle: 'Launch Frame',
      splashImageUrl: 'https://enjoyr2.vercel.app/logo.png',
      splashBackgroundColor: '#eeccff',
      webhookUrl: 'https://enjoyr2.vercel.app/api/webhook',
    },
  };

  return Response.json(config);
}
