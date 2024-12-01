function stringToKeywords(keywords) {
  return keywords?.split(',').some((item) => !item.trim().length)
    ? []
    : keywords.split(',').map((item) => item.trim());
}

exports.stringToKeywords = stringToKeywords;
