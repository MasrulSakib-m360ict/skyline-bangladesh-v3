export const validateVisaParams = (params: string[]) => {
  if (params.length !== 2) {
    throw new Error("Invalid params parameters");
  }
  const [country, visaType] = params.map(decodeURIComponent);

  const validateFormat = (param: string) => {
    const parts = param.split("-");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      throw new Error(`Invalid format for parameter: ${param}`);
    }
    return parts;
  };

  const [countryId, countryName] = validateFormat(country);
  const [visaTypeId, visaTypeName] = validateFormat(visaType);

  return {
    countryId,
    countryName,
    visaTypeId,
    visaTypeName,
    country,
    visaType,
  };
};
