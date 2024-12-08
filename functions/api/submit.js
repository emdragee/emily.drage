export async function onRequestPost(context) {
    const { request } = context;
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
  
    // Process the form data, e.g., send an email or store in a database
  
    return new Response('Form submission received.', { status: 200 });
  }
  