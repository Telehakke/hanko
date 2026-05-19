export const isNotNull = (value: unknown): value is Record<string, unknown> => {
    return value != null;
};

export const isNumber = (value: unknown): value is number => {
    return typeof value === "number";
};

export const isString = (value: unknown): value is string => {
    return typeof value === "string";
};
