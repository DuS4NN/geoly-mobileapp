import Theme1 from "./1"
import Theme2 from "./2"
import Theme3 from "./3"
import Theme4 from "./4"
import Theme5 from "./5"

export default function getMapTheme (mapTheme) {
    switch (mapTheme) {
        case 1:
            return Theme1
        case 2:
            return Theme2
        case 3:
            return Theme3
        case 4:
            return Theme4
        case 5:
            return Theme5
    }
}
