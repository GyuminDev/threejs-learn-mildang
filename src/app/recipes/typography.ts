import { cva, type RecipeVariantProps } from '../../../styled-system/css';

export const typographyRecipe = cva({
  // base: {
  //   color: 'zinc.50',
  // },
  variants: {
    level: {
      h1: {
        textStyle: 'headline1',
      },
      h2: {
        textStyle: 'headline2',
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
});

export type TypographyVariantProps = RecipeVariantProps<
  typeof typographyRecipe
>;
