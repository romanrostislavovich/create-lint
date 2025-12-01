export default {
  '**/*.{js,jsx,ts,tsx,svelte}': ['eslint --fix', 'prettier --write'],
  '**/*.{css,scss,sass}': ['prettier --write'],
  '**/*.{json}': ['prettier --write'],
  '**/*.{md}': ['markdownlint-cli2 -c ./.markdownlint.json'],
  '**/*.{html}': [],
};
