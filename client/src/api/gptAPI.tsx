import Auth from '../utils/auth';

const retrieveUsers = async (userQuestion:string) => {
  try {
    const response = await fetch('/api/ask/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(userQuestion)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };
