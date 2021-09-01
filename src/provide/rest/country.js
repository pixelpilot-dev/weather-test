import COUNTRY_BY_CODE from '@/utils/countryByCode';

/**
 * Get country by code
 *
 */
function getCountryByCode(code) {
  return COUNTRY_BY_CODE[code] || '';
}

export {
  getCountryByCode,
}