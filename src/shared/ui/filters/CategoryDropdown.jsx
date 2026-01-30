import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown'; 
import { FaFilter } from "react-icons/fa";
import styles from './CategoryDropdown.module.scss';

export const CategoryDropdown = ({ 
    options = [],          
    selectedValue,         
    onSelect,             
    showAllOption = true,  
    allLabel = "Смотреть все",
    buttonLabel = "Выбрать товар",
    disabled = false,
    className = ""
}) => {
    const handleSelect = (value) => {
        if (onSelect) {
            onSelect(value === 'all' ? null : value);
        }
    };

    const normalizedOptions = options.map(opt => 
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const currentLabel = selectedValue 
        ? normalizedOptions.find(opt => opt.value === selectedValue)?.label || selectedValue
        : buttonLabel;

    return (
        <Dropdown className={`${styles.filterStock} ${className}`}>
            <Dropdown.Toggle 
                variant="light" 
                id="dropdown-basic"
                disabled={disabled}
                className="filtered-stocks"
            >
                <FaFilter className={styles.filterIcon}/> {currentLabel}
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
                {showAllOption && (
                    <Dropdown.Item 
                        as="button" 
                        onClick={() => handleSelect('all')}
                        active={!selectedValue}
                        className={styles.dropdownItem}
                    >
                        {allLabel}
                    </Dropdown.Item>
                )}
                
                {normalizedOptions.map((option, index) => (
                    <Dropdown.Item 
                        key={option.value || option.id || index}
                        as="button" 
                        onClick={() => handleSelect(option.value)}
                        active={selectedValue === option.value}
                        className={styles.dropdownItem}
                    >
                        {option.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};