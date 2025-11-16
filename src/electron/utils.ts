export function isDevMode():boolean {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    return process.env.NODE_ENV === 'development';
}