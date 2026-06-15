import xss from "xss";

// accepts any list of inputs, and returns a list of sanitized inputs
export function sanitizeInput(...inputs: string[]): string[] {
    return inputs.map(input => xss(input));
}