async function customFetch(type, slug, body, requiresToken, handleExpiration) {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (requiresToken) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    }

    let config = {
        method: type || 'GET',
        mode: 'cors',
        headers
    }

    if (type && type !== 'GET') {
        config = {
            ...config,
            body: JSON.stringify(body)
        }
    }

    let response = await fetch(`https://serviciosmonlog.ddns.net/monlogisticaAPIv2/api/${slug}`, config);

    if (response.status === 401) {
        response = await fetch(`https://serviciosmonlog.ddns.net/monlogisticaAPIv2/api/${slug}`, {
            ...config,
            headers: {
                ...headers,
                'Authorization': `Bearer ${sessionStorage.getItem('refreshToken')}`
            }
        });
    }

    if (response.status === 401) {
        return handleExpiration();
    }

    let status = response.status;
    response = await response.json();
    response = {
        ...response,
        status
    }

    return response
}

export { customFetch }