import { defineTextStyles } from '@pandacss/dev';

const pxToRem = (pxValue: number, htmlFontSize: number = 16): string =>
  `${pxValue / htmlFontSize}rem`;

export const textStyles = defineTextStyles({
  D1: {
    value: {
      fontSize: pxToRem(48),
      lineHeight: pxToRem(68),
      fontWeight: 600,
    },
  },
  h1: {
    value: {
      fontSize: pxToRem(40),
      lineHeight: pxToRem(56),
      fontWeight: 600,
    },
  },
  h2: {
    value: {
      fontSize: pxToRem(32),
      lineHeight: pxToRem(44),
      fontWeight: 700,
    },
  },
  h3: {
    value: {
      fontSize: pxToRem(28),
      lineHeight: pxToRem(40),
      fontWeight: 700,
    },
  },
  h4: {
    value: {
      fontSize: pxToRem(23),
      lineHeight: pxToRem(36),
      fontWeight: 700,
    },
  },
  h5: {
    value: {
      fontSize: pxToRem(22),
      lineHeight: pxToRem(32),
      fontWeight: 700,
    },
  },
  h6: {
    value: {
      fontSize: pxToRem(20),
      lineHeight: pxToRem(30),
      fontWeight: 700,
    },
  },
  'subtitle1-B': {
    value: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      fontWeight: 700,
    },
  },
  'subtitle1-M': {
    value: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      fontWeight: 500,
    },
  },
  'subtitle2-B': {
    value: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(26),
      fontWeight: 700,
    },
  },
  'subtitle2-M': {
    value: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(26),
      fontWeight: 500,
    },
  },
  'subtitle3-B': {
    value: {
      fontSize: pxToRem(15),
      lineHeight: pxToRem(24),
      fontWeight: 700,
    },
  },
  'subtitle3-M': {
    value: {
      fontSize: pxToRem(15),
      lineHeight: pxToRem(24),
      fontWeight: 500,
    },
  },
  'subtitle4-B': {
    value: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(22),
      fontWeight: 700,
    },
  },
  'subtitle4-M': {
    value: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(22),
      fontWeight: 500,
    },
  },
  'body1-R': {
    value: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(30),
      fontWeight: 400,
    },
  },
  'body2-R': {
    value: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(28),
      fontWeight: 400,
    },
  },
  'body3-R': {
    value: {
      fontSize: pxToRem(15),
      lineHeight: pxToRem(26),
      fontWeight: 400,
    },
  },
  'body4-R': {
    value: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(24),
      fontWeight: 400,
    },
  },
  'body1-B': {
    value: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(30),
      fontWeight: 700,
    },
  },
  'body2-B': {
    value: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(28),
      fontWeight: 700,
    },
  },
  'body3-B': {
    value: {
      fontSize: pxToRem(15),
      lineHeight: pxToRem(26),
      fontWeight: 700,
    },
  },
  'body4-B': {
    value: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(24),
      fontWeight: 700,
    },
  },
  'Caption1-M': {
    value: {
      fontSize: pxToRem(13),
      lineHeight: pxToRem(22),
      fontWeight: 500,
    },
  },
  'Caption1-R': {
    value: {
      fontSize: pxToRem(13),
      lineHeight: pxToRem(22),
      fontWeight: 400,
    },
  },
  'Caption2-M': {
    value: {
      fontSize: pxToRem(12),
      lineHeight: pxToRem(20),
      fontWeight: 500,
    },
  },
  'Caption2-R': {
    value: {
      fontSize: pxToRem(12),
      lineHeight: pxToRem(20),
      fontWeight: 400,
    },
  },
  'Caption3-M': {
    value: {
      fontSize: pxToRem(10),
      lineHeight: pxToRem(18),
      fontWeight: 500,
    },
  },
  'Caption3-R': {
    value: {
      fontSize: pxToRem(10),
      lineHeight: pxToRem(18),
      fontWeight: 400,
    },
  },
  'button-XL': {
    value: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      fontWeight: 500,
    },
  },
  'button-L': {
    value: {
      fontSize: pxToRem(15),
      lineHeight: pxToRem(26),
      fontWeight: 500,
    },
  },
  'button-M': {
    value: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(24),
      fontWeight: 500,
    },
  },
  'button-S': {
    value: {
      fontSize: pxToRem(12),
      lineHeight: pxToRem(20),
      fontWeight: 400,
    },
  },
});
