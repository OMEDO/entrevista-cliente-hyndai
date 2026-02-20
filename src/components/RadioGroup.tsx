import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../styles/theme';

export interface RadioOption {
  label: string;
  value: string;
}

interface Props {
  options: RadioOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  horizontal?: boolean;
}

const RadioGroup = ({ options, selected, onSelect, horizontal = false }: Props) => (
  <View style={[styles.container, horizontal && styles.horizontal]}>
    {options.map(opt => {
      const active = selected === opt.value;
      return (
        <TouchableOpacity
          key={opt.value}
          style={[styles.option, horizontal && styles.optionH, active && styles.optionActive]}
          onPress={() => onSelect(opt.value)}
          activeOpacity={0.7}
        >
          <View style={[styles.radio, active && styles.radioActive]}>
            {active && <View style={styles.radioDot} />}
          </View>
          <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// Componente específico para Sí / No
export const YesNoRadio = ({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) => (
  <RadioGroup
    horizontal
    options={[
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ]}
    selected={value === null ? null : value ? 'si' : 'no'}
    onSelect={v => onChange(v === 'si')}
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  optionH: {
    minWidth: 80,
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.sectionBg,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: fontWeight.regular,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
});

export default RadioGroup;
