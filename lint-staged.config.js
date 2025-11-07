export default {
  '**/*.{js,jsx,ts,tsx,svelte}': ['eslint --fix', 'prettier --write'],
  '**/*.{css,scss,vue}': ['prettier --write'],
  '**/*.{json,md,html}': ['prettier --write'],
};
