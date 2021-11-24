export const parseSearch = (location, name) => {
    const search = location.search;
    const params = new URLSearchParams(search);

    return params.get(name);
}