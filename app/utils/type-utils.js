// @flow

export const typeGenerator = (
  domainString: string,
  conditions?: Array<string>
) => {
  if (typeof domainString !== 'string') {
    throw new Error(
      `domainString must be a string; instead got ${typeof domainString}`
    );
  }
  if (conditions) {
    if (!Array.isArray(conditions) || conditions.length !== 3) {
      throw new Error('conditions must be an Array of length 3');
    }
    return conditions.map(condition => `${domainString}/${condition}`);
  }
  return [
    `${domainString}/REQUEST`,
    `${domainString}/SUCCESS`,
    `${domainString}/FAILURE`
  ];
};

export const getRequestType = typeArray => typeArray[0];

export const getSuccessType = typeArray => typeArray[1];

export const getFailureType = typeArray => typeArray[2];
