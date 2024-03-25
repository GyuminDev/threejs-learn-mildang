import { defineRecipe } from '@pandacss/dev';
import { PropertyValueTypes } from '../../../styled-system/types/prop-type';
type TextStyle = PropertyValueTypes['textStyle'];

const textStyles: TextStyle[] = [
  'D1',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1-B',
  'subtitle1-M',
  'subtitle2-B',
  'subtitle2-M',
  'subtitle3-B',
  'subtitle3-M',
  'subtitle4-B',
  'subtitle4-M',
  'body1-R',
  'body2-R',
  'body3-R',
  'body4-R',
  'body1-B',
  'body2-B',
  'body3-B',
  'body4-B',
  'Caption1-M',
  'Caption1-R',
  'Caption2-M',
  'Caption2-R',
  'Caption3-M',
  'Caption3-R',
  'button-XL',
  'button-L',
  'button-M',
  'button-S',
];

const variant = textStyles.reduce(
  (acc, variant) => {
    acc[variant] = {
      textStyle: variant,
    };
    return acc;
  },
  {} as Record<TextStyle, { textStyle: TextStyle }>,
);

export const typographyRecipe = defineRecipe({
  className: 'typography',
  variants: {
    variant,
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
