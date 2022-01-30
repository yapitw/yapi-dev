export const classNames = (classNames: (string | false | undefined)[]): string => {
    return classNames.filter(Boolean).join(' ')
}
