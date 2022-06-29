export type PaginatedResponse<T, PropertyName extends string> = {
    [P in PropertyName]: T[];
};
