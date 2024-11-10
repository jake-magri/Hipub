import Auth from '../utils/auth';

const askQuestion = async (question:string) => {
  try {
    // send question to server
    const response = await fetch('/api/ask/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({question})
    });
    // await server response
    const data = await response.json();
    console.log(`Open API response: ${JSON.stringify(data, null, 2)}`);
    if(!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }
    // drill into object and get property
    console.log('this'+JSON.stringify(data.response));
    return data.response;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { askQuestion };
