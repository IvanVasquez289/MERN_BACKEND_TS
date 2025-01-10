import colors from 'colors'
export class ColorsAdapter {
    static magenta = (message: string) => {
        console.log(colors.magenta(message))
    }
    static red = (message: string) => {
        console.log(colors.red(message))
    }
    static rainbow = (message: string) => {
        console.log(colors.rainbow(message))
    }
    static cyan = (message: string) => {
        console.log(colors.cyan(message))
    }
    static green = (message: string) => {
        console.log(colors.green(message))
    }
}