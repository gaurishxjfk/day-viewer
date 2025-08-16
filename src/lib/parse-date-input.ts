export default function parseDateInput(dateInput: string): Date {
    const cleanInput = dateInput.trim().toLowerCase();
    
    // Match patterns: 12/08, 12-08, 12_08, 12-aug, 12-august, 12-08-2025
    const datePattern = /^(\d{1,2})[/\-_](.+?)(?:[/\-_](\d{4}))?$/;
    const match = cleanInput.match(datePattern);
    
    if (!match) {
      throw new Error("Invalid date format. Use DD/MM, DD-MM, DD_MM, DD-MON, DD-MONTH, or DD-MM-YYYY");
    }
    
    const day = parseInt(match[1], 10);
    const monthInput = match[2];
    const yearInput = match[3];
    const currentYear = new Date().getFullYear();
    
    if (day < 1 || day > 31) {
      throw new Error("Day must be between 1 and 31");
    }
    
    // Month mapping
    const monthMap: { [key: string]: number } = {
      'jan': 1, 'january': 1,
      'feb': 2, 'february': 2,
      'mar': 3, 'march': 3,
      'apr': 4, 'april': 4,
      'may': 5,
      'jun': 6, 'june': 6,
      'jul': 7, 'july': 7,
      'aug': 8, 'august': 8,
      'sep': 9, 'september': 9,
      'oct': 10, 'october': 10,
      'nov': 11, 'november': 11,
      'dec': 12, 'december': 12
    };
    
    let month: number;
    
    // Check if it's a numeric month
    if (/^\d{1,2}$/.test(monthInput)) {
      month = parseInt(monthInput, 10);
      if (month < 1 || month > 12) {
        throw new Error("Month must be between 1 and 12");
      }
    } else {
      // Check if it's a month name
      month = monthMap[monthInput];
      if (!month) {
        throw new Error("Invalid month name or number");
      }
    }
    
    // Use provided year or default to current year
    const year = yearInput ? parseInt(yearInput, 10) : currentYear;
    
    // Validate year (reasonable range)
    if (year < 1900 || year > 2100) {
      throw new Error("Year must be between 1900 and 2100");
    }
    
    const date = new Date(year, month - 1, day);
    
    if (date.getMonth() !== month - 1 || date.getDate() !== day) {
      throw new Error("Invalid date");
    }
    
    return date;
  }