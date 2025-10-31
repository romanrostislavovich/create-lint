export default {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{css,scss,vue}': ['prettier --write'],
  '**/*.{json,md,html}': ['prettier --write'],
};
