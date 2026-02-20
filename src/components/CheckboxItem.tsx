import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../styles/theme';

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const CheckboxItem = ({ label, checked, onToggle, disabled = false }: Props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onToggle}
    activeOpacity={0.7}
    disabled={disabled}
  >
    <View style={[styles.box, checked && styles.boxChecked]}>
      {checked && <Text style={styles.check}>✓</Text>}
    </View>
    <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.xs,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },
  boxChecked: {
    backgroundColor: colors.checkboxActive,
    borderColor: colors.checkboxActive,
  },
  check: {
    color: colors.white,
    fontSize: fontSize.sm - 1,
    fontWeight: fontWeight.bold,
    lineHeight: 16,
  },
  label: {
    fontSize: fontSize.md,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  labelDisabled: {
    color: colors.gray,
  },
});

export default CheckboxItem;
