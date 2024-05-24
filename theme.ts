import { Button, defineStyle, defineStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react'
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
      800: "#70E8E4",
      700: "#99E8E4"
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
        color: "black",
        padding: "0.25rem 1rem",
        borderRadius: "0.5rem",
        fontWeight: "bold",
        fontFamily: "heading",
      },
    },
    Button: {
      variants: {
        brandPrimaryButton: {
          bg: "brand.900",
          color: "black",
          fontFamily: "heading",
          _hover: {
            bg: "brand.800",
          },
          _active: {
            bg: "brand.700",
          },
        },
        brandGhostButton: {
          bg: "transparent",
          color: "black",
          fontFamily: "heading",
          _hover: {
            bg: "brand.800",
            color: "black",
            fontWeight: "bold",
          },
          _active: {
            bg: "brand.800",
          },
        },
      }
    }
  }
})

export default theme