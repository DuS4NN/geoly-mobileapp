export default function getDate (date) {
    let newDate = new Date(date)
    return (newDate.getDate()) + ". " + (newDate.getMonth()+1)+ ". " + newDate.getFullYear()
}
