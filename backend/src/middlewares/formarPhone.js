const formatNumber = (phone) => {
        if (phone.startsWith("+55")){
            return;
        }
        if (phone.startsWith('55') && phone.length === 13) {
            phone = `+${phone}`;
        } else {
            // Caso contrário, adiciona o +55
            phone = `+55${phone}`;
        }
        return phone
}

export default formatNumber;