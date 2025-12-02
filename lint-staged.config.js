export default {
  '**/*.{js,jsx,ts,tsx,svelte}': ['eslint --fix', 'prettier --write --check .'],
  '**/*.{css,scss,sass}': ['prettier --write --check .'],
  '**/*.{json}': ['prettier --write --check .'],
  '**/*.{md}': ['markdownlint-cli2 -c ./.markdownlint.json'],
  '**/*.{html}': [],
};
