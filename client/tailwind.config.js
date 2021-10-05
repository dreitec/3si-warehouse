const colors = {
  /* colors */
  brandingBlue1: "#056E9D",
  brandingBlue2: "#5EACD8",
  brandingBlue3: "#88D8FB",

  blueGray1: "#535F74",
  blueGray2: "#7A869A",
  blueGray3: "#9DA5B3",
  blueGray4: "#BBC3D1",
  blueGray5: "#D4DDEC",
  blueGray6: "#DCE3EF",
  blueGray7: "#E8F1F5",
  blueGray8: "#F0FAFE",

  gray1: "#333333",
  gray3: "#707071",
  gray4: "#AFAFAF",
  gray5: "#E0E0E0",
  gray6: "#EBEBEB",
  gray7: "#F5F5F5",

  white: "#FFFFFF",

  warn: "#F18724",
  error: "#B81414",

  lightBorder: "rgba(227, 242, 247, 0.6)",
  modalOverlay: "rgba(83, 95, 116, 0.4)",
  scrollBar: "rgba(179, 179, 179, 0.8)",

  opaqueLight20: "rgba(255, 255, 255, 0.2)",
  opaqueLight40: "rgba(255, 255, 255, 0.4)",
  opaqueLight80: "rgba(255, 255, 255, 0.8)",
  opaqueLight90: "rgba(255, 255, 255, 0.9)",

  /* gradients */
  gradBlueMediumVertical: "linear-gradient(180deg, #0678AD 0%, #5CA3D8 100%)",
  gradBlueMediumHorizontal: "linear-gradient(90deg, #0678AD 0%, #5CA3D8 100%)",
  gradBlueDarkSubtitleVertical:
    "linear-gradient(0deg, rgba(5, 110, 157, 0.6), rgba(5, 110, 157, 0.6)), linear-gradient(196.48deg, #5CA3D8 11.42%, #0678AD 88.58%)",
  gradBlueBubbleAngle: "linear-gradient(44.81deg, #4FAFDB 0%, #78D0ED 100%)",
  gradLightHorizontal:
    "linear-gradient(270deg, #FFFFFF -100.31%, #F2FBFF 100%)",
  gradLightReverseHorizontal:
    "linear-gradient(270deg, #F2FBFF 0%, #FFFFFF 198.21%)",
  gradLightAltVertical1: "linear-gradient(180deg, #FFFFFF 0%, #F2FBFF 100%)",
  gradLightAltVertical2: "linear-gradient(180deg, #F7FDFF 0%, #F2FBFF 100%)",
  gradLightVertical:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), linear-gradient(180deg, #78D0ED 0%, #4FAFDB 100%)",
  gradDarkVertical:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #056E9D",

  gradButtonPrimary:
    "linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #056E9D",
  gradButtonBright:
    "linear-gradient(270deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(136, 216, 251, 0.75), rgba(136, 216, 251, 0.75)), #056E9D",
  gradButtonLight:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2FBFF",
  gradButtonAccent:
    "linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #FE9023",
  gradButtonDisabledDark:
    "linear-gradient(270deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #535F74",
  gradButtonDisabledLight:
    "linear-gradient(270deg, rgba(187, 195, 209, 0) 0%, rgba(187, 195, 209, 0.4) 100%), #FFFFFF",
  gradRadioCheckbox:
    "linear-gradient(0deg, rgba(5, 110, 157, 0.2), rgba(5, 110, 157, 0.2)), linear-gradient(180deg, #5CA3D8 0%, #0678AD 100%)",
  gradDisabledBubble:
    "radial-gradient(50% 50% at 50% 50%, rgba(98, 115, 174, 0) 16.15%, rgba(92, 94, 105, 0.03) 100%), rgba(65, 94, 143, 0.1)",
  gradDisabledBubbleDark:
    "radial-gradient(50% 50% at 50% 50%, rgba(98, 115, 174, 0) 16.15%, rgba(92, 94, 105, 0.03) 100%), rgba(78, 92, 116, 0.18)",
  gradWidgetSubtitle:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.75)",
  gradChart1:
    "inear-gradient(0deg, rgba(5, 110, 157, 0.8), rgba(5, 110, 157, 0.8)), linear-gradient(91.69deg, #88D8FB 5.26%, #056E9D 70.12%)",
  gradChart2:
    "linear-gradient(180.74deg, rgba(255, 255, 255, 0.5) 0.26%, rgba(0, 0, 0, 0.5) 118.31%), #88D8FB",
  gradChart3:
    "linear-gradient(89.44deg, rgba(255, 255, 255, 0.1) 0.05%, rgba(255, 255, 255, 0) 49.54%), linear-gradient(269.81deg, rgba(51, 51, 51, 0.4) 26.33%, rgba(255, 255, 255, 0.64) 100.08%)",
};



module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    screens: {
      'xl': { 'min': '1920px' },
      'lg': { 'min': '1280px' },
      'md': { 'min': '960px' },
      'sm': { 'min': '600px' },
      'xs': { 'min': '0px' },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: colors.brandingBlue1,
      secondary: colors.blueGray4,
      danger: colors.error,
      danger: colors.warn,
      tooltip: colors.blueGray7,
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      blue: colors.brandingBlue1,
      primary: colors.blueGray1,
      disabled: colors.blueGray3,
      "gray-3": colors.gray3,
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
