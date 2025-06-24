const generatePhoneFormatTwilio = (phone) => {
    let phoneClean = phone.trim().replace(/\D/g, '');

    if (phoneClean.startsWith('55') && phoneClean.length === 13) {
        return `+${phoneClean}`;
    }

    if (phone.trim().startsWith('+55')) {
        return phone.trim();
    }

    return `+55${phoneClean}`;
}

export default generatePhoneFormatTwilio;