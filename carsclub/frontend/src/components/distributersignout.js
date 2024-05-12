import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DistributorSignout = () => {
    const history = useHistory();

    useEffect(() => {
        fetch('/distributorSignout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => {
                localStorage.removeItem('Distributor');
                history.push('/distributorsignin', { replace: true });
                if (res.status !== 200) {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <h1>Log Out</h1>
        </>
    );
};

export default DistributorSignout;
