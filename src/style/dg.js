import { createTheme } from '@mui/material/styles'

export const palette = {
  actionBlue: '#023198',
  accentBlue: '#0164b0',
  black: '#000',
  lightblack: '#333333',
  darkslateblue1: '#1f3661',
  darkslateblue2: '#183564',
  marineblue: '#004765',
  blue: '#1055cc',
  skyblue: '#95bfe9',
  darkgreyblue: '#2b426a',
  windowsblue: '#319aca',
  lightgreyblue: '#8cb8e4',
  lightblue: '#0778ad',
  paleblue: '#e5e6e8',
  tealishblue: '#039',
  darkGrey: '#333',
  darkGrey2: '#707171',
  grey: '#cececd',
  whiteGrey: '#999999',
  lightGrey: '#494949',
  backGray: '#ddd',
  lightGrey3: '#A0A0A0',
  lightGrey4: '#dedede',
  greydark: '#252525',
  greyishbrown: '#595959',
  greylabel: '#666666',
  greyishblue: '#B9B9BB',
  greyishpink: '#efefef',
  purplishgrey: '#757475',
  brownishgrey: '#5a5a5a',
  brownishred: '#ad0016',
  brownishgrey2: '#666',
  browngrey: '#979797',
  browngrey2: '#9b9b9b',
  browngrey3: '#a0a0a0',
  verylightpink50: 'rgba(239, 239, 239, 0.5)',
  whiteish: '#f4f4f4',
  whiteishGrey: '#d8d8d8',
  white: '#fff',
  error: '#be1e2d',
  dougallRed: '#c50201',
  translationRed: '#ad0016',
  contrastText: '#1f3561',
  buttonFocus: '#84b3e2',
  verylightGrey: 'rgba(185, 185, 187, 0.8)',
  lightGreyBlueAction: 'rgba(140, 184, 228, .8)',
  iconGray: '#667085',
  almostBlack: '#101828',
  lowGray: '#475467',
  successLightGreen: '#d1fadf',
  successLighterGreen: '#ecfdf3',
  errorIconStrong: '#d92c21',
  errorLightRed: '#fee4e2',
  errorLighterRed: '#fef3f2',
  gold: '#b18366'
}
export const fontFamily = {
  fontPrimary: ['"Helvetica"', 'Arial', 'sans-serif'].join(','),
  fontSecondary: ['Imperial', 'Georgia', 'serif'].join(','),
  fontTertiary: 'arial',
  fontQuaternary: 'Helvetica',
  fontSenary: 'AvenirNext-DemiBold'
}
const dg = createTheme({
  palette: {
    background: {
      main: palette.backGray
    },
    primary: {
      main: palette.lightgreyblue,
      contrastText: palette.contrastText
    },
    filter: {
      white: palette.white,
      background: palette.contrastText,
      border: palette.contrastText,
      borderLoading: palette.greyishblue
    },
    header: {
      main: palette.white,
      menuIcon: palette.paleblue,
      searchIcon: palette.browngrey
    },
    menu: {
      main: palette.grey,
      topText: palette.skyblue,
      divider: palette.lightGrey,
      selected: palette.lightblue,
      searchInput: palette.whiteGrey,
      searchIcon: palette.brownishgrey2,
      searchText: palette.brownishgrey2,
      background: palette.greydark
    },
    divider: {
      main: palette.verylightGrey
    },
    sharerModal: { divider: palette.whiteishGrey },
    search: {
      divider: palette.white,
      searchIcon: palette.accentBlue,
      resultsLabel: palette.greyishbrown
    },
    comments: {
      divider: palette.black,
      button: palette.contrastText,
      inputBorder: palette.paleblue,
      inputBackground: palette.greyishpink,
      showMore: palette.contrastText,
      headerDivider: palette.greyishbrown
    },
    banner: { main: palette.brownishred, text: palette.white },
    misc: {
      content: palette.brownishgrey
    },
    modal: {
      content: palette.greyishbrown,
      icons: palette.browngrey2,
      divider: palette.greyishblue
    },
    backButton: {
      fontColor: palette.browngrey
    },
    formButton: {
      fontColor: palette.darkslateblue2,
      backgroundColor: palette.lightgreyblue,
      spinnerColor: 'rgba(0, 0, 0, 0.30)'
    },
    searchTransition: {
      searchIcon: palette.contrastText,
      dividerText: palette.brownishred,
      divider: palette.verylightGrey,
      inputBorder: palette.browngrey,
      inputLabel: palette.greylabel,
      inputPlaceholder: palette.lightblack,
      input: palette.black
    },
    formDivider: {
      primary: palette.black,
      secondary: palette.brownishred,
      divider: palette.browngrey
    },
    formInput: {
      inputPlaceholder: palette.purplishgrey,
      inputBorder: palette.browngrey,
      inputText: palette.black,
      placeholderSecondary: palette.verylightGrey
    },
    formDropDown: {
      selectIcon: palette.black
    },
    formInputHelper: {
      helperText: palette.black
    },
    label: {
      labelText: palette.lightblack
    },
    socialElements: {
      action: palette.darkslateblue2,
      textPrimary: palette.browngrey,
      iconPrimary: palette.browngrey,
      gptRed: palette.brownishred
    },
    brands: {
      dougallRed: palette.dougallRed
    },
    error: { main: palette.error },
    alertModal: {
      closeIcon: palette.iconGray,
      titleColor: palette.almostBlack,
      messageColor: palette.lowGray,
      success: {
        modalBorder: palette.successLightGreen,
        backgroundColor: palette.successLighterGreen,
        iconBackgroundColor: palette.successLightGreen
      },
      error: {
        icon: palette.errorIconStrong,
        modalBorder: palette.errorLightRed,
        backgroundColor: palette.errorLighterRed,
        iconBackgroundColor: palette.errorLightRed
      }
    },
    listing: { main: palette.greyishbrown },
    somRiver: {
      oddRow: palette.white,
      evenRow: palette.lightGrey4,
      border: palette.lightGrey4
    },
    editProfile: {
      fieldset: palette.tealishblue
    }
  },
  typography: {
    fontFamily: fontFamily.fontPrimary,
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '22.5px',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    caption: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '17px',
      color: palette.purplishgrey,
      fontFamily: fontFamily.fontPrimary
    },
    articleDate: {
      //greeting
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '17.1429px',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    articleTitle: {
      //display1
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '33.7646px',
      color: palette.brownishgrey2,
      fontFamily: fontFamily.fontPrimary
    },
    articlePSLLabel: {
      fontWeight: 'bold',
      fontFamily: fontFamily.fontPrimary
    },
    articleSource: {
      fontWeight: 500,
      fontSize: '13.125px',
      lineHeight: '22.5001px',
      textTransform: 'uppercase',
      fontFamily: fontFamily.fontPrimary,
      color: palette.brownishgrey2
    },
    articleSourceLink: {
      fontWeight: 400,
      fontSize: '13.125px',
      wordBreak: 'break-all',
      fontFamily: fontFamily.fontPrimary,
      color: palette.darkslateblue2
    },
    footnote: {
      fontFamily: fontFamily.fontPrimary,
      color: palette.brownishgrey,
      fontSize: '14px'
    },
    footnoteLink: {
      fontFamily: fontFamily.fontPrimary,
      color: palette.darkgreyblue,
      fontSize: '14px',
      textDecoration: 'none'
    },
    footnoteDivider: {
      color: palette.grey
    },
    formTitle: {
      fontSize: '28px',
      minHeight: '34px',
      marginBottom: '4px',
      color: palette.greylabel,
      fontFamily: fontFamily.fontQuaternary
    },
    formSubtitle: {
      fontSize: '15px',
      fontSizeSecondary: '16px',
      lineHeight: 1.5,
      minHeight: '22px',
      color: palette.lightblack,
      fontFamily: fontFamily.fontQuaternary
    },
    formCaption: {
      fontSize: '15px',
      lineHeight: 1.47,
      minHeight: '20px',
      fontFamily: fontFamily.fontQuaternary
    },
    articleInsitute: {
      fontStyle: 'normal',
      fontSize: '1em',
      fontWeight: '700',
      lineHeight: '1.5',
      marginTop: '3px',
      marginBottom: '3px',
      textDecoration: 'none',
      textTransform: 'none',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    articleType: {
      fontSize: '12px',
      textAlign: 'right',
      fontWeight: 'normal',
      whiteSpace: 'nowrap',
      color: palette.lightGrey3,
      fontFamily: fontFamily.fontPrimary
    },
    'articleType.primaryStyling': {
      fontSize: '12px',
      textAlign: 'right',
      fontWeight: 'normal',
      whiteSpace: 'nowrap',
      color: palette.lightGrey3,
      fontFamily: fontFamily.fontPrimary
    },
    'articleType.secondaryStyling': {
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'right',
      whiteSpace: 'nowrap',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    noResultsTitle: {
      display: 'flex',
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '25.5px',
      justifyContent: 'center',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    listingTitle: {
      margin: '0px',
      marginTop: '3px',
      fontSize: '18px',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '25.2px',
      marginBottom: '3px',
      textTransform: 'none',
      textDecoration: 'none',
      display: 'inline-block',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    articleExcerpt: {
      fontSize: '15px',
      marginTop: '5px',
      fontWeight: 400,
      lineHeight: '22.5px',
      fontStyle: 'normal',
      marginBottom: '3px',
      textTransform: 'none',
      textDecoration: 'none',
      display: 'inline-block',
      color: palette.brownishgrey,
      fontFamily: fontFamily.fontPrimary
    },
    adNavigation: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      textDecoration: 'underline',
      cursor: 'pointer',
      color: palette.actionBlue,
      fontFamily: fontFamily.fontPrimary
    },
    adInArticle: {
      fontSize: '15px',
      fontWeight: 'bold',
      lineHeight: '1.33',
      textAlign: 'center',
      color: palette.tealishblue
    },
    loginLink: {
      lineHeight: 1.5,
      fontSize: '15px',
      cursor: 'pointer',
      color: palette.actionBlue,
      fontFamily: fontFamily.fontQuaternary
    },
    checkboxLabel: {
      lineHeight: 1.42,
      fontSize: '12px',
      letterSpacing: '-0.33px',
      color: palette.lightblack,
      fontFamily: fontFamily.fontQuaternary
    },
    registrationDropdown: {
      lineHeight: 1.5,
      fontSize: '16px',
      color: palette.lightblack,
      fontFamily: fontFamily.fontQuaternary
    },
    registrationThanksTitle: {
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '32.6px',
      color: palette.brownishgrey2,
      fontFamily: fontFamily.fontSecondary
    },
    registrationContactUs: {
      fontSize: '16px',
      color: palette.blue,
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'none'
      }
    },
    loginInput: {
      label: {
        fontFamily: fontFamily.fontQuaternary
      }
    },
    somRiverTitle: {
      fontSize: '15px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      textAlign: 'left',
      lineHeight: '1.6',
      maxWidth: '270px',
      color: palette.darkGrey2,
      fontFamily: fontFamily.fontQuaternary
    },
    somRiverText: {
      fontSize: '15px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      lineHeight: '1.6',
      justifyContent: 'center',
      textAlign: 'center',
      color: palette.darkGrey2,
      fontFamily: fontFamily.fontQuaternary
    },
    somRiverLink: {
      fontSize: '15px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      lineHeight: '1.6',
      justifyContent: 'center',
      textAlign: 'center',
      textDecoration: 'underline',
      color: palette.blue,
      fontFamily: fontFamily.fontQuaternary
    },
    heroCaption: {
      color: palette.brownishgrey,
      fontFamily: fontFamily.fontPrimary,
      fontSize: '.8em',
      fontWeight: 400,
      lineHeight: '1.375em'
    },
    heroTitle: {
      color: palette.black,
      fontFamily: fontFamily.fontSecondary,
      fontSize: '2em',
      fontWeight: 400,
      lineHeight: '1.16667em'
    },
    loadingText: {
      fontSize: '21px',
      fontWeight: 'bold',
      color: palette.greyishbrown,
      fontFamily: fontFamily.fontPrimary
    },
    articleSecondTitle: {
      fontSize: '22px',
      lineHeight: '26px',
      fontWeight: 'bold',
      color: palette.black,
      fontFamily: fontFamily.fontSecondary
    },
    commentTitle: {
      fontFamily: fontFamily.fontPrimary,
      color: palette.greyishbrown,
      height: '25px',
      fontSize: '21px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.31px'
    },
    showHideLink: {
      fontFamily: fontFamily.fontSenary,
      color: palette.contrastText,
      fontSize: '14px',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1',
      letterSpacing: 'normal',
      textAlign: 'right',
      cursor: 'pointer'
    },
    commentLink: {
      fontFamily: fontFamily.fontPrimary,
      color: palette.contrastText,
      justifyContent: 'flex-end',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.88',
      letterSpacing: '-0.33px',
      textAlign: 'right'
    },
    commentShowMore: {
      fontFamily: fontFamily.fontSenary,
      color: palette.contrastText,
      fontSize: '14px',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1',
      letterSpacing: 'normal',
      textAlign: 'center'
    },
    commentUser: {
      fontFamily: fontFamily.fontPrimary,
      color: palette.purplishgrey,
      fontSize: '12px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.88',
      letterSpacing: '-0.33px'
    },
    comment: {
      fontFamily: fontFamily.fontPrimary,
      color: palette.purplishgrey,
      fontSize: '15px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.5',
      letterSpacing: '-0.42px'
    }
  },
  components: {
    Filter: {
      styleOverrides: {
        filterGroup: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          padding: '13px 0 12px 0',
          rowGap: '10px',
          gap: '10px'
        }
      }
    },
    FormButton: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily.fontPrimary,
          borderRadius: '3px',
          border: '0',
          height: '37px',
          fontSize: '18px',
          fontWeight: 'bold',
          fontStretch: 'normal',
          textTransform: 'uppercase',
          fontStyle: 'normal',
          lineHeight: '1.06',
          flexAlign: 'center',
          letterSpacing: 'normal',
          boxShadow: 'none',
          '&:focus, &:hover, &:active': {
            backgroundColor: palette.lightGreyBlueAction,
            boxShadow: 'none'
          }
        },
        spinner: {
          marginTop: '-12px',
          marginBottom: '-12px'
        }
      },
      variants: [
        {
          props: { section: 'loginWithEmail' },
          style: {
            width: '100%',
            marginBottom: '10px',
            letterSpacing: '1.26px'
          }
        },
        {
          props: { section: 'loginWithEmailAndPass' },
          style: {
            width: '100%',
            marginBottom: '8.5px',
            letterSpacing: '1.26px'
          }
        },
        {
          props: { section: 'registration' },
          style: {
            width: '100%',
            marginTop: '5.5px',
            height: '37px'
          }
        },
        {
          props: { section: 'feedback' },
          style: {
            justifySelf: 'center',
            alignSelf: 'center',
            margin: '2px 0 16px 0',
            padding: '0 15px 0 15px'
          }
        },
        {
          props: { section: 'profile' },
          style: {
            minWidth: '173px',
            margin: '15.5px 0 16px 0'
          }
        },
        {
          props: { section: 'emailShare' },
          style: {
            height: '40px',
            letterSpacing: '1.26px',
            width: '115px',
            marginTop: '19px',
            marginBottom: '58px'
          }
        },
        {
          props: { section: 'unsubscribe' },
          style: { margin: '8px 0' }
        }
      ]
    },
    FormInput: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily.fontPrimary,
          fontSize: '15px',
          lineHeight: '25px',
          borderRadius: '3px',
          padding: '0px'
        },
        input: {
          padding: '10.22px 9px 10.22px 9px'
        },
        textArea: {
          padding: '10.50px 9px 10.50px 9px'
        }
      }
    },
    FormDropDown: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        }
      }
    },
    FormInputHelper: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          lineHeight: '15px',
          marginTop: '3px',
          marginLeft: '0px',
          height: '15px'
        }
      }
    },
    FormDivider: {
      styleOverrides: {
        dividerText: {
          fontFamily: fontFamily.fontPrimary,
          fontSize: '1.067rem',
          lineHeight: '21px',
          width: '50px'
        },
        dividerContainer: {
          flexGrow: 1,
          height: '21px'
        },
        dividerLine: {
          '::before': {
            borderTop: 'thin solid'
          },
          '::after': {
            borderTop: 'thin solid'
          }
        }
      }
    },
    TranslationLink: {
      styleOverrides: {
        TranslationLinkWrapper: {
          marginBottom: '16px',
          fontWeight: '700',
          fontSize: '13px',
          color: palette.translationRed,
          lineHeight: '19.5px',
          '@media (max-width: 599.95px)': {
            marginBottom: '0px'
          }
        },
        Action: {
          fontWeight: '700',
          fontSize: '13px',
          color: palette.translationRed,
          display: 'inline-block',
          textDecoration: 'underline',
          cursor: 'pointer'
        }
      },
      variants: []
    },
    TranslationBannerWrap: {
      styleOverrides: {
        TranslationBannerContainer: {
          width: '560px',
          marginLeft: '-20px',
          marginBottom: '16px',
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          '@media (max-width: 599.95px)': {
            width: 'auto',
            marginLeft: '0',
            marginBottom: '10px'
          }
        },
        DividerContainer: {
          flex: 'auto',
          width: '520px',
          margin: '20px auto 0',
          maxWidth: '520px',
          '@media (max-width: 599.95px)': {
            width: 'auto'
          }
        }
      },
      variants: []
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: '15px 20px',
          height: '70px',
          heightSmallScreen: '56px',
          alignSelf: 'center',
          boxShadow: 'none'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: { width: '100%' }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: { padding: '0px !important' }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: { border: '0px !important' }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { padding: '0px !important' }
      }
    },
    EditProfile: {
      styleOverrides: {
        buttonContainer: {
          justifyContent: 'center'
        }
      }
    },
    Menu: {
      styleOverrides: {
        inputContainer: {
          margin: '7px 0px 0px 17px',
          paddingBottom: '5px'
        },
        searchInput: {
          margin: '0px 21px 0px 0px',
          borderRadius: '2px',
          height: '30px'
        },
        listItem: {
          padding: '11px 0px 14px 0'
        },
        divider: { margin: '0 0 0 0', backgroundColor: palette.lightGrey }
      }
    },
    Header: {
      styleOverrides: {
        logo: {
          height: '40px',
          heightSmallScreen: '30px'
        },
        title: {
          color: palette.darkslateblue2,
          fontFamily: fontFamily.fontQuaternary,
          fontSize: '20px',
          marginLeft: '19px'
        },
        Container: {
          boxShadow: 'none'
        },
        rightContainer: {
          marginRight: '-4px'
        }
      }
    },
    Head: {
      styleOverrides: {
        Container: {
          paddingBottom: '0px',
          marginBottom: '0px'
        }
      }
    },
    Unsubscribe: {
      styleOverrides: {
        container: {
          padding: '10px 0 10px 0'
        },
        unsubscribeTitle: {
          color: palette.greyishbrown,
          fontSize: '16px'
        },
        unsubscribeDescription: {
          color: palette.brownishgrey2,
          fontSize: '13px'
        },
        unsubscribeNote: {
          color: palette.greyishbrown,
          fontSize: '16px'
        },
        successMessageContainer: {
          backgroundColor: palette.purplishgrey,
          height: '127px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: 0
        },
        successContent: {
          paddingLeft: '40px'
        },
        successTextTop: {
          color: palette.white,
          fontSize: '26.25px',
          padding: '0 0 10px 0',
          lineHeight: 'normal'
        },
        successTextBottom: {
          color: palette.white,
          fontSize: '15px',
          padding: '0 0 10px 0',
          lineHeight: 'normal'
        }
      },
      variants: []
    },
    FeedbackForm: {
      styleOverrides: {
        FeedBackTitle: {
          color: palette.brownishgrey2,
          fontFamily: fontFamily.fontQuaternary,
          fontSize: '28px',
          lineHeight: '1',
          marginBottom: '20px',
          marginTop: '8px'
        },
        FeedBackSubHeader: {
          color: palette.greyishbrown,
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '17px'
        },
        Form: {
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0 0 0'
        }
      },
      variants: []
    },
    Page: {
      styleOverrides: {
        MainContainer: {
          flex: 'auto',
          width: '600px',
          margin: 'auto',
          height: '100%',
          backgroundColor: palette.greyishpink,
          '@media (max-width: 520px)': {
            width: 'auto',
            padding: '0'
          }
        },
        SpecialContainer: {
          backgroundColor: '#fff',
          padding: '5px 20px 70vh 20px'
        },
        NormalContainer: {
          backgroundColor: '#fff',
          padding: '5px 20px 25px 20px'
        },
        ContentContainer: {
          padding: '8px 20px 10px 20px',
          '@media (max-width: 520px)': {
            padding: '8px 0 0 0'
          }
        },
        FeedContainer: {
          padding: '0 20px 10px 20px',
          '@media (max-width: 520px)': {
            padding: '8px 0 0 0'
          }
        }
      }
    },
    Footer: {
      styleOverrides: {
        FooterWrapper: {
          marginTop: '8px',
          backgroundColor: palette.white
        },
        FooterContainer: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90px'
        },
        FooterContent: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }
      }
    },
    Modal: {
      styleOverrides: {
        title: {
          fontSize: '28px',
          fontWeight: 'normal',
          color: palette.greyishbrown,
          padding: '20px 20px 5px 20px',
          fontFamily: fontFamily.fontPrimary
        }
      }
    },
    SearchTransition: {
      styleOverrides: {
        container: {
          marginTop: '26px'
        },
        searchInputHelperText: {
          lineHeight: '12px',
          marginTop: '1px',
          height: '12px'
        },
        inputLabel: {
          marginBottom: '16px',
          fontFamily: fontFamily.fontPrimary,
          fontSize: '18px',
          fontWeight: 'normal',
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 'normal',
          letterSpacing: '0.18px'
        },
        input: {
          height: '42px',
          padding: '2px 7px 2px 0px',
          borderRadius: '3px'
        },
        dividerText: {
          fontFamily: fontFamily.fontPrimary,
          fontSize: '1.067rem',
          lineHeight: '21px',
          width: '50px'
        },
        dividerContainer: {
          height: '21px',
          marginBottom: '20px'
        },
        dividerLine: {
          '::before': {
            borderTop: 'thin solid'
          },
          '::after': {
            borderTop: 'thin solid'
          }
        }
      }
    },
    Label: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily.fontQuaternary,
          minHeight: '24px',
          margin: '11px 0px 0px 0px',
          fontSize: '16px',
          lineHeight: 1.5
        }
      }
    },
    ListingDivider: {
      styleOverrides: {
        divider: {
          width: '110%',
          height: '8px',
          margin: '0 0 0 -5%',
          objectFit: 'contain',
          backgroundColor: palette.greyishpink,
          border: 'none'
        }
      },
      variants: [
        {
          props: { variant: 'comments' },
          style: {
            backgroundColor: palette.greyishbrown,
            height: '2.5px',
            margin: '9px 0 6px 0'
          }
        }
      ]
    },
    SocialIconsContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          textDecoration: 'none',
          width: '61px',
          marginRight: '24px',
          flexDirection: 'row'
        },
        xs: {
          fontSize: '11px'
        }
      },
      variants: [
        {
          props: { lastElement: true },
          style: { width: 'auto', marginRight: '0px' }
        },
        {
          props: { variant: 'article' },
          style: { flexDirection: 'column', width: 'auto' }
        }
      ]
    },
    SocialIconWrapper: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          paddingRight: '0px',
          pointerEvents: 'auto'
        },
        xs: {
          fontSize: '11px'
        }
      },
      variants: [
        {
          props: { variant: 'feed' },
          style: {
            marginRight: '7px',
            fontSize: '16px'
          }
        },
        {
          props: { variant: 'article' },
          style: {
            fontSize: '16px'
          }
        },
        {
          props: { action: 'isLiking' },
          style: {
            opacity: 0.7,
            pointerEvents: 'none'
          }
        }
      ]
    },
    SocialTypography: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily.fontPrimary,
          lineHeight: '19px',
          fontSize: '16px',
          fontWeight: 'bold',
          fontStretch: 'normal',
          fontStyle: 'normal',
          letterSpacing: 'normal'
        },
        sm: {
          justifyContent: 'space-between'
        },
        xs: {
          fontSize: '11px'
        }
      },
      variants: [
        {
          props: { variant: 'article' },
          style: {
            marginTop: '6px'
          }
        },
        {
          props: { variant: 'articleLike' },
          style: {
            marginTop: '8px'
          }
        }
      ]
    },
    InfiniteListing: {
      styleOverrides: {
        ListingContainer: {
          padding: '0',
          backgroundColor: palette.white
        }
      },
      variants: [
        {
          props: { variant: 'root' },
          style: {
            padding: '0 20px',
            '@media (max-width: 520px)': {
              padding: '0 20px',
              margin: '0'
            }
          }
        }
      ]
    },
    Listing: {
      styleOverrides: {
        container: {
          padding: '0px',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: '15px'
        }
      }
    },
    AdInArticle: {
      styleOverrides: {
        goldRectangle: {
          width: '514px',
          marginLeft: '-20px',
          padding: '3px 20px 16px',
          border: 'solid 3px',
          borderColor: palette.gold
        },
        scrollDownText: {
          height: '20px',
          margin: '10px 0 14px 0',
          padding: '0 80px',
          cursor: 'pointer'
        },
        articleContinueText: {
          height: '20px',
          margin: '17px 0 9px 0',
          padding: '0 182px',
          cursor: 'pointer'
        }
      }
    },
    Registration: {
      styleOverrides: {
        container: {
          marginTop: '32px'
        },
        thanksContainer: { padding: '0 20px 45px 19px' },
        thanksTitle: {
          padding: '30px 0 20px'
        },
        checkbox: { paddingTop: '0px', paddingBottom: '0px' },
        button: { marginTop: '12px', marginBottom: '34px' }
      }
    },
    Article: {
      styleOverrides: {
        container: {
          maxWidth: '100%',
          textAlign: 'left',
          borderCollapse: 'collapse',
          marginBottom: '1.4em',
          clear: 'both',
          wordBreak: 'break-word',
          'table, th, tr': {
            maxWidth: '100%',
            overflowX: 'auto',
            textAlign: 'left',
            borderCollapse: 'collapse',
            width: '100%',
            fontSize: '9.5pt',
            padding: '15px',
            border: '1px solid black'
          },
          body: {
            minHeight: '100%',
            height: '100%',
            padding: 0,
            margin: 0,
            position: 'relative !important'
          },
          img: {
            maxWidth: '100%',
            height: 'auto'
          },
          a: { color: palette.actionBlue }
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 360,
      s: 440,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  zIndex: { appBar: 2, drawer: 4 }
})
export default dg
