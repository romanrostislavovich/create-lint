export default {
  "**/*.{js,jsx,ts,tsx,svelte}": [
    "prettier --config prettier.config.mjs --write --check ."
  ],
  "**/*.{css,scss,sass}": [
    "stylelint **/*.{scss,sass,css} -c ./.stylelintrc.mjs --fix",
    "prettier --config prettier.config.mjs --write --check ."
  ],
  "**/*.{json}": [
    "prettier --config prettier.config.mjs --write --check ."
  ],
  "**/*.{html}": [
    "htmlhint --config ./.htmlhintrc **/*.html"
  ]
};
