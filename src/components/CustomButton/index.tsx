import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styles from './CustomButton.style';
import colors from 'styles/colors';

export type ButtonVariant = 'primary' | 'cancelled' | 'disabled';
interface CustomButtonType extends TouchableOpacityProps {
  title: any;
  isLoading?: boolean;
  variant?: ButtonVariant;
}

export const buttonStyles: any = {
  primary: {
    borderColor: colors.greenTint1,
  },
  cancelled: {
    borderColor: colors.pinkTint1,
  },
  disabled: {
    borderColor: colors.buttonBorder,
  },
};

export const createButtonStyles = (variant: ButtonVariant) => {
  const variantStyle = buttonStyles[variant];
  return {
    button: {
      borderColor: variantStyle.borderColor,
    },
    text: {
      color: variantStyle.borderColor,
    },
  };
};

const CustomButton: React.FC<CustomButtonType> = ({
  title,
  onPress,
  isLoading,
  variant = 'primary',
  style,
  ...props
}) => {
  const variantStyle = createButtonStyles(variant);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, variantStyle.button, style]}
      {...props}>
      <Text style={[styles.textButton, variantStyle.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
