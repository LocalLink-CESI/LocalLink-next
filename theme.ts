import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import "@fontsource-variable/open-sans"
import "@fontsource-variable/montserrat"
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      900: "#12E8E4",
      800: "#14E8E4",
      700: "#16E8E4"
    },
    black: {
      900: "#1F1F1F",
      800: "#2F2F2F",
      700: "#3F3F3F"
    },
    green: {
      900: "#80E565",
      800: "#90E565",
      700: "#A0E565"
    },
    yellow: {
      900: "#FFD866",
      800: "#FFD866",
      700: "#FFD866"
    }
  },
  fonts: {
    body: "Open Sans Variable, sans-serif",
    heading: "Montserrat, sans-serif",
  },
  components: {
    Tooltip: {
      baseStyle: {
        bg: "brand.900",
        color: "white",
        padding: "0.25rem 1rem",
        borderRadius: "0.5rem",
        fontWeight: "bold",
        fontFamily: "heading",
      },
    },
  }
})

export default theme