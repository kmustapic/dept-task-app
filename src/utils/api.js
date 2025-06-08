export async function doRequest({url, method, body, token, setMessage }){
    setMessage({type:'', text:''});

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && {Authorization: `Bearer ${token}`}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        const data = await response.json();

        if(!response.ok) {
            const msg = data.message || 'An error occured.';
            setMessage({type:'error', text:msg});
            return null;
        }
        return data;
    }
    catch (err) {
        setMessage({type:'error', text:'Error in communication with the server.'});
        return null;
    }
}