// Configurações para geocodificação otimizada
export const GEOCODING_CONFIG = {
    // API Keys - Forçar uso da chave correta do LocationIQ
    LOCATIONIQ_API_KEY: 'pk.05c09cb62d481ccfb76ec10ffbaf1748',
    
    // Parâmetros da API
    API_BASE_URL: 'https://us1.locationiq.com/v1/search.php',
    DEFAULT_LIMIT: 5,
    DEFAULT_FORMAT: 'json',
    
    // Configurações de precisão - Reduzidas para aceitar mais resultados
    HIGH_CONFIDENCE_THRESHOLD: 0.3,
    MEDIUM_CONFIDENCE_THRESHOLD: 0.1,
    
    // Configurações específicas para Brasil
    COUNTRY_CODE: 'Brasil',
    DEFAULT_REGION: 'BR',
    
    // Timeouts
    REQUEST_TIMEOUT: 10000,
    
    // Configurações de cache (para implementação futura)
    CACHE_ENABLED: false,
    CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 horas em ms
    
    // Configurações de retry
    MAX_RETRIES: 2,
    RETRY_DELAY: 1000,
};

// Configurações específicas por região do Brasil
export const REGIONAL_CONFIGS = {
    'DF': {
        // Distrito Federal tem endereços específicos
        useQuadraConjunto: true,
        defaultCity: 'Brasília',
    },
    'SP': {
        useQuadraConjunto: false,
        defaultCity: 'São Paulo',
    },
    'RJ': {
        useQuadraConjunto: false,
        defaultCity: 'Rio de Janeiro',
    },
    // Adicionar outras regiões conforme necessário
};

// Função para obter configuração regional
export const getRegionalConfig = (uf) => {
    return REGIONAL_CONFIGS[uf?.toUpperCase()] || {
        useQuadraConjunto: false,
        defaultCity: '',
    };
};

// Função para formatar endereço específico do DF
export const formatDFAddress = (address) => {
    const { street, house_number, neighborhood, city, uf } = address;
    
    // Para DF, usar formato específico se for quadra/conjunto
    if (uf?.toUpperCase() === 'DF') {
        // Garantir que seja reconhecido como Brasília
        const brasiliaContext = 'Brasília, Distrito Federal, Brasil';
        
        if (street?.toLowerCase().includes('quadra')) {
            return `${street} ${house_number || ''}, ${neighborhood}, ${brasiliaContext}`;
        } else {
            return `${street} ${house_number || ''}, ${neighborhood}, ${brasiliaContext}`;
        }
    }
    
    return `${street} ${house_number || ''}, ${neighborhood}, ${city}, ${uf}, Brasil`;
};

// Função para limpar dados do endereço preservando acentos
export const cleanAddressData = (address) => {
    return {
        street: address.street?.trim() || '',
        neighborhood: address.neighborhood?.trim() || '',
        city: address.city?.trim() || '',
        uf: address.uf?.trim() || '',
        house_number: address.house_number?.trim() || '',
        cep: address.cep?.replace(/\D/g, '') || '',
        complement: address.complement?.trim() || ''
    };
};

export default GEOCODING_CONFIG; 