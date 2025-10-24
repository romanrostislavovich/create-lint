export function ensureArray(v: any) {
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
}
