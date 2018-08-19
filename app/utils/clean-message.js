const removeQuoted = message => {
  const quoteRegex = /(On).*[0-9]{4}\s.*@.*.(\w{3}).*\s(wrote:)/g;
  if (message.search(quoteRegex) > -1) {
    return message.slice(0, message.search(quoteRegex));
  }
  return message;
};

const removeForward = message => {
  const forwardRegex = /-*\s(forwarded message)(:|\s)-*/gi;
  if (message.search(forwardRegex) > -1) {
    return message.slice(0, message.search(forwardRegex));
  }
  return message;
};

export default function(message) {
  return removeQuoted(removeForward(message));
}
