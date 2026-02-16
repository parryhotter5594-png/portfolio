import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

interface EditableProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  textarea?: boolean;
}

const Editable: React.FC<EditableProps> = ({ value, onSave, className = "", textarea = false }) => {
  const { isAdmin } = useContent();
  const [localValue, setLocalValue] = useState(value ?? "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Only sync from props if we are NOT currently editing
    if (!isEditing) {
      setLocalValue(value ?? "");
    }
  }, [value, isEditing]);

  if (!isAdmin) {
    if (textarea) {
        return <span className={`whitespace-pre-wrap ${className}`}>{value}</span>;
    }
    return <span className={className}>{value}</span>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onSave(localValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!textarea && e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  // Base styles: If className is provided, it can override these.
  // We use template literal to append className at the end.
  const baseInputStyles = `bg-yellow-500/10 dark:bg-yellow-500/20 border-b border-dashed border-yellow-500 outline-none transition-colors w-full ${className}`;

  if (textarea) {
    return (
      <textarea 
        value={localValue} 
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`${baseInputStyles} resize-y`}
      />
    );
  }

  return (
    <input 
      type="text" 
      value={localValue} 
      onChange={handleChange} 
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      className={baseInputStyles}
    />
  );
};

export default Editable;