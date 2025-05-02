export const getToken = async (): Promise<string> => {
    try {
        const res = await fetch('/api/user', {
            credentials: 'include',
            method: 'GET',
        });

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Respuesta no JSON:', text.slice(0, 100));
            return '';
        }

        const data = await res.json();
        return data.user?.apiToken || '';
    } catch (err) {
        console.error('Error al obtener datos del usuario', err);
        return '';
    }
};