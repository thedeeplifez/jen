export default defineNuxtPlugin(nuxtApp => {
  /**
   * Generate random UID
   * @param {number} [length=4] - Number of characters of the UID. Defaults to 4 if omitted.
   * @returns {string} The generated UID
   */
  const randomId = (length = 4) => {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
      var str = "";
      for (var i = 0; i < length; i++) {
          str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return str;
  }

  /**
   * Filter out non-numeric characters upon keydown 
   * @param {Event} event - The keydown event
   * @returns 
   */
  const filterNumberInput = (event) => {
		if(['1','2','3','4','5','6','7','8','9','0', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(event.key) == -1) {
			event.preventDefault();
			return;
		}
	};

  /**
   * Format number to desired decimal places with thousands separator
   * @param {number | string} value - The number to format
   * @param {number} decimalPlaces - The desired decimal places
   * @param {boolean} removeZero - Remove trailing zero if set to true
   * @returns {string}
   */
  const fn = (value, decimalPlaces, removeZero) => {
    if (typeof value != "string" && typeof value != "number") return 0;

    let [numerals, decimals] = value.toString().split('.')
    const formattedNumerals = new Intl.NumberFormat("en-US"/* , { minimumFractionDigits: decimalPlaces } */).format(numerals);

    if (!decimals) decimals = ''
    if (typeof decimalPlaces == 'number') {
        if (decimalPlaces > 20) decimalPlaces = 20
        if (decimalPlaces < decimals.length) {
            decimals = decimals.substring(0, decimalPlaces)
        }
        else if (decimalPlaces > decimals.length) {
            do {
                decimals += '0'
            } while(decimals.length < decimalPlaces)
        }
    }
    if (removeZero) decimals = decimals.replace(/0+$/g, "");
    if (decimals) {
        return `${formattedNumerals}.${decimals}`
    }
    return formattedNumerals
};

  /**
   * Format date, date string, timestamp to YYYY-MM-DD
   * @param {dateObject | string | number} date - The date to format
   * @returns {string}
   */
  const fds = (date) => {
    let dateObject = date
    try {
      if (typeof date == 'string' || typeof date == 'number') {
        dateObject = new Date(date)
      }
      if (!dateObject || isNaN(dateObject.getTime())) {
        return '-'
      }

      let month = dateObject.getMonth() + 1;
      if (month < 10) month = `0${month}`;

      let dayDate = dateObject.getDate();
      if (dayDate < 10) dayDate = `0${dayDate}`;

      return `${dateObject.getFullYear()}-${month}-${dayDate}`;
    }
    catch(err) {
      console.log(err)
      return '-'
    }
  }

  /**
   * Format date, date string, timestamp to YYYY-MM-DD HH:MM
   * @param {dateObject | string | number} date - The date to format
   * @returns {string}
   */
  const fdl = (date) => {
    let dateObject = date
    try {
      if (typeof date == 'string' || typeof date == 'number') {
        dateObject = new Date(date)
      }
      if (!dateObject || isNaN(dateObject.getTime())) {
        return '-'
      }

      let month = dateObject.getMonth() + 1;
      if (month < 10) month = `0${month}`;

      let dayDate = dateObject.getDate();
      if (dayDate < 10) dayDate = `0${dayDate}`;

      let hour = dateObject.getHours();
      if (hour < 10) hour = `0${hour}`;

      let minute = dateObject.getMinutes();
      if (minute < 10) minute = `0${minute}`;
      return `${dateObject.getFullYear()}-${month}-${dayDate} ${hour}:${minute}`;
    }
    catch(err) {
      console.log(err)
      return '-'
    }
  }

  return {
    provide: {
      randomId,
      filterNumberInput,
      fn,
      fds,
      fdl
    }
  };
});
