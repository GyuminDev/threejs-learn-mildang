import { HTMLAttributes } from 'react';
import {
  typographyRecipe,
  type TypographyVariantProps,
} from '../recipes/typography';
import { cx } from '../../../styled-system/css';

type TypographyHTMLProps = HTMLAttributes<HTMLElement>;

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TypographyProps = TypographyVariantProps &
  TypographyHTMLProps & { as?: TypographyElement };

export function Typography(props: TypographyProps) {
  const [variantProps, localProps] = typographyRecipe.splitVariantProps(props);
  const { as: Component = 'p', className, ...restProps } = localProps;
  return (
    <Component
      className={cx(typographyRecipe(variantProps), className)}
      {...restProps}
    />
  );
}
