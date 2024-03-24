import { cva, type RecipeVariantProps } from '../../../styled-system/css';
import { defineRecipe } from '@pandacss/dev';

export const typographyRecipe = defineRecipe({
  className: 'typography',
  variants: {
    variant: {
      D1: {
        textStyle: 'D1',
      },
      h1: {
        textStyle: 'h1',
      },
      h2: {
        textStyle: 'h2',
      },
      h3: {
        textStyle: 'h3',
      },
      h4: {
        textStyle: 'h4',
      },
      h5: {
        textStyle: 'h5',
      },
      h6: {
        textStyle: 'h6',
      },
      'subtitle1-B': {
        textStyle: 'subtitle1-B',
      },
      'subtitle1-M': {
        textStyle: 'subtitle1-M',
      },
      'subtitle2-B': {
        textStyle: 'subtitle2-B',
      },
      'subtitle2-M': {
        textStyle: 'subtitle2-M',
      },
      'subtitle3-B': {
        textStyle: 'subtitle3-B',
      },
      'subtitle3-M': {
        textStyle: 'subtitle3-M',
      },
      'subtitle4-B': {
        textStyle: 'subtitle4-B',
      },
      'subtitle4-M': {
        textStyle: 'subtitle4-M',
      },
      'body1-R': {
        textStyle: 'body1-R',
      },
      'body2-R': {
        textStyle: 'body2-R',
      },
      'body3-R': {
        textStyle: 'body3-R',
      },
      'body4-R': {
        textStyle: 'body4-R',
      },
      'body1-B': {
        textStyle: 'body1-B',
      },
      'body2-B': {
        textStyle: 'body2-B',
      },
      'body3-B': {
        textStyle: 'body3-B',
      },
      'body4-B': {
        textStyle: 'body4-B',
      },
      'Caption1-M': {
        textStyle: 'Caption1-M',
      },
      'Caption1-R': {
        textStyle: 'Caption1-R',
      },
      'Caption2-M': {
        textStyle: 'Caption2-M',
      },
      'Caption2-R': {
        textStyle: 'Caption2-R',
      },
      'Caption3-M': {
        textStyle: 'Caption3-M',
      },
      'Caption3-R': {
        textStyle: 'Caption3-R',
      },
      'button-XL': {
        textStyle: 'button-XL',
      },
      'button-L': {
        textStyle: 'button-L',
      },
      'button-M': {
        textStyle: 'button-M',
      },
      'button-S': {
        textStyle: 'button-S',
      },
    },
    bold: {
      true: {
        fontWeight: 'bold',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
  },
  defaultVariants: {
    variant: 'body1-R',
  },
});

// export type TypographyVariantProps = RecipeVariantProps<
//   typeof typographyRecipe
// >;
