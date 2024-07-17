// connectwallet.js

export async function connectPolinkWallet(dispatch, setAddress) {
    return new Promise((resolve, reject) => {
        const obj = setInterval(async () => {
            if (window.pox) {
                clearInterval(obj);
                try {
                    const detailsData = await window.pox.getDetails();
                    const parsedDetailsObject = JSON.parse(JSON.stringify(detailsData));
                    const walletAddress = parsedDetailsObject[1]?.data?.wallet_address;
                    const poxBalance = parsedDetailsObject[1]?.data?.Balance / Math.pow(10, 6);
                    const usdxBalance = parsedDetailsObject[1]?.data?.USDX;

                    dispatch(setWalletAddress(walletAddress));
                    setAddress(walletAddress);
                    dispatch(setPoxBalance(poxBalance));
                    dispatch(setUsdxBalance(usdxBalance));
                    resolve(walletAddress);
                } catch (error) {
                    reject(error);
                }
            }
        }, 1000);
    });
}
