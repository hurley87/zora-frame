export async function GET() {
  const config = {
    accountAssociation: {
      header:
        'eyJmaWQiOjc5ODgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg1MUQ0NDZFOTNhMTcxZGQxMkY4NGI3NWE4RDFCNjgyNTVGN2MxRjgyIn0',
      payload: 'eyJkb21haW4iOiJlbmpveXIyLnZlcmNlbC5hcHAifQ',
      signature:
        'MHg2ZmQ0OTZiMTA3ODI5ZjcyYTQzZDQ0MDI4NGM3ZTdjNzFhNTNjODRkMjQ0ZTg1ZDE0MWFhY2IwNjhjNDk1OTRhNWJiZjJiYTIyNjcwYjA4MGI2ZmFiMGE2MDJhODZkNTNhMmFmZjUzOTVkMjA0ZjIwODQyMzBkMDQxMWQ2ZDIxMzFj',
    },
    frame: {
      version: '1',
      name: 'Example Frame',
      iconUrl: 'https://enjoyr2.vercel.app/icon.png',
      homeUrl: 'https://enjoyr2.vercel.app',
      imageUrl: 'https://enjoyr2.vercel.app/image.png',
      buttonTitle: 'Check this out',
      splashImageUrl: 'https://enjoyr2.vercel.app/splash.png',
      splashBackgroundColor: '#eeccff',
      webhookUrl: 'https://enjoyr2.vercel.app/api/webhook',
    },
  };

  return Response.json(config);
}
