import React from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { theme } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  buttonVariant?: ButtonVariant;
}

export class ButtonFactory {
  static createButton(props: CustomButtonProps): React.ReactElement {
    const { buttonVariant = 'primary', sx, ...otherProps } = props;

    const getVariantStyles = (variant: ButtonVariant) => {
      switch (variant) {
        case 'primary':
          return {
            background: theme.colors.primary.gradient,
            color: 'white',
            '&:hover': {
              background: theme.colors.primary.gradient,
              opacity: 0.9,
            },
          };
        case 'secondary':
          return {
            background: theme.colors.secondary,
            color: 'white',
            '&:hover': {
              background: theme.colors.secondary,
              opacity: 0.9,
            },
          };
        case 'success':
          return {
            background: theme.colors.success,
            color: 'white',
            '&:hover': {
              background: theme.colors.success,
              opacity: 0.9,
            },
          };
        case 'error':
          return {
            background: theme.colors.error,
            color: 'white',
            '&:hover': {
              background: theme.colors.error,
              opacity: 0.9,
            },
          };
        default:
          return {};
      }
    };

    return (
      <Button
        {...otherProps}
        sx={{
          ...getVariantStyles(buttonVariant),
          ...sx,
        }}
      />
    );
  }

  static PrimaryButton(props: Omit<CustomButtonProps, 'buttonVariant'>): React.ReactElement {
    return this.createButton({ ...props, buttonVariant: 'primary' });
  }

  static SecondaryButton(props: Omit<CustomButtonProps, 'buttonVariant'>): React.ReactElement {
    return this.createButton({ ...props, buttonVariant: 'secondary' });
  }

  static SuccessButton(props: Omit<CustomButtonProps, 'buttonVariant'>): React.ReactElement {
    return this.createButton({ ...props, buttonVariant: 'success' });
  }

  static ErrorButton(props: Omit<CustomButtonProps, 'buttonVariant'>): React.ReactElement {
    return this.createButton({ ...props, buttonVariant: 'error' });
  }
}