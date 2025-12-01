import { defineConfig } from "eslint/config";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'; 
import prettierRecommended from 'eslint-plugin-prettier/recommended'; 





export default defineConfig([
    {
        ignores: ["dist/**"],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettierRecommended, 
    
    
    
    
]);
