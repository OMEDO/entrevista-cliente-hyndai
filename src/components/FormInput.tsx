import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextStyle,
} from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../styles/theme';

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  suffix?: string;
  style?: TextStyle;
  editable?: boolean;
}

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  suffix,
  style,
  editable = true,
}: Props) => (
  <View style={styles.wrapper}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <View style={styles.inputRow}>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          suffix ? styles.inputWithSuffix : null,
          !editable && styles.inputDisabled,
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? ''}
        placeholderTextColor={colors.gray}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        editable={editable}
      />
      {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.white,
    minHeight: 40,
  },
  inputWithSuffix: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  multiline: {
    minHeight: 88,
    paddingTop: spacing.sm,
  },
  inputDisabled: {
    backgroundColor: colors.lightGray,
    color: colors.gray,
  },
  suffix: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: colors.border,
    borderTopRightRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
    backgroundColor: colors.lightGray,
    minHeight: 40,
    textAlignVertical: 'center',
  },
});

export default FormInput;
