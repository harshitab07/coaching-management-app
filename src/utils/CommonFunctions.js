export const parseDate = (dateString) => {
    const delimiter = dateString.includes("/") ? "/" : "-";
    const [day, month, year] = dateString.split(delimiter);
    console.log(day, month, year);
    return new Date(`${month}/${day}/${year}`);
};