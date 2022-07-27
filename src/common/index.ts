// eslint-disable-next-line import/prefer-default-export
export const IS_NODE = !!process.env.IS_NODE || (typeof window === 'undefined' && typeof global === 'object');
