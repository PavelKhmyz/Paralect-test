import { createStyles, getStylesRef } from '@mantine/core';

const BROWSE_BTN_SIZE = '100%';

export const useStyles = createStyles(
  ({
    colors,
    primaryColor,
    other: {
      transition: { speed, easing },
    },
  }) => ({
    dropzoneRoot: {
      // border: 'none',
      border: `3px dashed ${colors[primaryColor][6]}`,
      borderRadius: 0,
      padding: 0,
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:hover': {
        border: `3px dashed ${colors.gray[5]}`,
      },

      [`&:hover .${getStylesRef('addIcon')}`]: {
        color: colors.gray[5],
      },

      [`&:hover .${getStylesRef('browseButton')}`]: {
        // border: `1px dashed ${colors.gray[5]}`,
      },

      [`&:hover .${getStylesRef('innerAvatar')}`]: {
        opacity: 1,
      },
    },
    browseButton: {
      ref: getStylesRef('browseButton'),
      width: BROWSE_BTN_SIZE,
      height: BROWSE_BTN_SIZE,
      // borderRadius: '50%',
      // border: `1px dashed ${colors[primaryColor][6]}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: `all ${speed.fast} ${easing.easeInOut}`,
      cursor: 'pointer',
    },
    addButton: {
      borderRadius: '50%',
      width: '200px',
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px dashed ${colors.gray[6]}`,
      transition: `all ${speed.fast} ${easing.easeInOut}`,

      '&:hover': { border: `2px dashed ${colors[primaryColor][6]}` },

      [`&:hover .${getStylesRef('plusIcon')}`]: {
        color: colors[primaryColor][6],
      },
    },
    plusIcon: {
      ref: getStylesRef('plusIcon'),
      color: colors.gray[6],
      transition: `all ${speed.fast} ${easing.easeInOut}`,
    },
    error: {
      border: `1px dashed ${colors.red[5]}`,
    },
    addIcon: {
      ref: getStylesRef('addIcon'),
      color: colors[primaryColor][6],
      transition: `all ${speed.fast} ${easing.easeInOut}`,
    },
    innerAvatar: {
      ref: getStylesRef('innerAvatar'),
      width: '100%',
      height: '100%',
      // borderRadius: '50%',
      background: '#10101099',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.gray[2],
      opacity: 0,
      transition: `all ${speed.smooth} ${easing.easeInOut}`,
    },
    text: {
      width: '144px',
      lineHeight: '24px',
      color: colors.gray[6],
      wordWrap: 'break-word',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    errorMessage: {
      marginTop: '4px',
      fontSize: '14px',
      lineHeight: '17px',
      color: colors.red[5],
    },
    avatar: {
      width: BROWSE_BTN_SIZE,
      height: BROWSE_BTN_SIZE,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: '50%',
    },
  })
);
