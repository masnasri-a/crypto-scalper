import { useEffect, useState } from 'react';

const Account = () => {
    const [accountData, setAccountData] = useState({
        name: '',
        walletPublicKey: '',
        privateKey: '',
        apiKey: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('account.json');
            const data = await response.json();
            setAccountData(data);
        };

        fetchData();
    }, []);

    return (
        <div className="flex-grow p-6">
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex flex-col gap-3">
                    <label htmlFor="name_token" className="text-sm text-gray-700">Name</label>
                    <input type="text" placeholder="Name" id="name_token" className="p-2 border border-gray-300 rounded" value={accountData.name} disabled />
                    <label htmlFor="public_address" className="text-sm text-gray-700">Public Address</label>
                    <input type="text" placeholder="Public Address" id="public_address" className="p-2 border border-gray-300 rounded" value={accountData.walletPublicKey} disabled />
                    <label htmlFor="private_address" className="text-sm text-gray-700">Private Address</label>
                    <input type="text" placeholder="Private Address" id="private_address" className="p-2 border border-gray-300 rounded" value={accountData.privateKey} disabled />
                    <small className="text-red-500">Do not share with other people</small>
                    <label htmlFor="api_key" className="text-sm text-gray-700">API Key</label>
                    <textarea placeholder="API Key" id="api_key" className="p-2 border border-gray-300 rounded" value={accountData.apiKey} disabled />
                    <small className="text-red-500">Do not share with other people</small>
                    <div className="flex w-full justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" id="generate_key">Generate New API Key</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;