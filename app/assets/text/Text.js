export default function getText (id) {
    switch (id) {
        case 1:
            return require("./1").text
        case 2:
            return require("./2").text
    }
}
