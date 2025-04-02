
# AliExpress Package Card

This custom Lovelace card displays packages from AliExpress, allowing you to track your orders directly from Home Assistant with [AliExpress Tracker component ](https://github.com/yohaybn/HA_aliexpress_package_tracker_sensor).

## Screenshots

![AliExpress Package Card](https://github.com/yohaybn/lovelace-aliexpress-package-card/blob/main/images/screenshot_light.png)
![AliExpress Package Card](https://github.com/yohaybn/lovelace-aliexpress-package-card/blob/main/images/screenshot_dark.png)

## Features

- Display AliExpress package tracking information
- Add new tracking numbers directly from the card
- Edit and remove existing tracking numbers
- Multi-language support with community-contributed translations *([See Localization section](#-localization--translations))*
- Compatible with both light and dark themes

## Installation

### Installation via HACS (Recommended)
1. Open HACS in your Home Assistant dashboard.
2. Until this repository is part of HACS by default, you need to add it as a custom repository. (working on it)
3. Go to *Integrations* > *Add custom repository* and enter:  ``` https://github.com/yohaybn/lovelace-aliexpress-package-card ```
4. Once added, search for "AliExpress Package Tracker Card" in HACS and install it.

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=lovelace-aliexpress-package-card&owner=yohaybn)

### Manual Installation

1. Download the `aliexpress_package_card.js` file from the repository.
2. Place the file in your `config/www` directory.
3. Add the following to your `ui-lovelace.yaml` or Lovelace resources:

```yaml
resources:
  - url: /local/aliexpress_package_card.js
    type: module
```

## Configuration

Add the card to your Lovelace UI with these options:

-   **`type:`** (Required)
    -   Set to `custom:aliexpress-package-card` to load this card.
-   **`title:`** (Optional)
    -   Text displayed at the top of the card (e.g., "AliExpress Tracking").
-   **`hide_add_tracking:`** (Optional)
    -   Boolean (`true`/`false`). Set to `true` to hide the "Add Tracking" section.
    -   Default: `false` (shown).
-   **`exclude_attributes:`** (Optional)
    -   A list of attribute names (strings) to hide from the package details display.
    -   Examples: `order_number`, `status`, `last_update_time`, `carrier_url`, `order_url`.
    -   Default: Empty list (shows all attributes).

### Options


- `hide_add_tracking` (boolean): Whether to hide the "Add Tracking" section. Default is `false`.
- `exclude_attributes` (list): List of attributes to exclude from the card display.

## Example

```yaml
type: custom:aliexpress-package-card
hide_add_tracking: false
exclude_attributes:
  - carrier_url
  - order_url
language: fr
```
## 🌍 Localization / Translations

This card supports displaying text in multiple languages using translation files located in the translations/ directory.

**How it Works:**

-   Each supported language has a JSON file (e.g., en.json, es.json).
    
-   The card uses English (en.json) as the default and fallback language. If a translation is missing in your selected language, it will display the English text instead.
    
-   An index.json file lists the available languages for selection in the card's editor.
    

**🙏 Help Improve Translations!**

The current non-English translations were generated using AI and **may contain errors or sound unnatural**. We rely on the community to improve them!

**How to Contribute:**

1.  **Find the translations/ folder** in the card's source directory.
    
2.  **Copy en.json** and **rename** it using the [ISO 639-1 code](https://www.google.com/url?sa=E&q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FList_of_ISO_639-1_codes) for your language (e.g., pt.json for Portuguese).
    
3.  **Translate** the **string values** (text after the colons) in your new file. **Do not change the keys** (text before colons). Use a UTF-8 compatible editor.
    
4.  **Add your language** to translations/index.json, following the existing format (e.g., { "code": "pt", "name": "Português" }).
    
5.  **Submit** your changes via a Pull Request or GitHub Issue on the card's repository.
    

Your contributions help make this card better for everyone!

## 🚚 Carrier Logos

This card displays carrier logos for easier visual identification.

**How it Works:**
-   Logos are mapped from carrier names to image URLs in the `carrier_logos.json` file.  
-   If a logo isn't in the file, the card attempts to use the carrier's website favicon as a fallback (requires carrier_url attribute).
    

**🙏 Help Expand Logo Coverage!**
The included logo list might be incomplete. Adding logos for more carriers benefits everyone.
**How to Contribute:**
1.  **Find** a public URL for the missing carrier's logo.
2.  **Add** an entry to carrier_logos.json, mapping the exact carrier name (from attributes) to the logo URL. 
    ```
    // carrier_logos.json - Example Addition
    {
      // ... existing logos ...
      "Specific Carrier Name": "https://carrier.com/logo.png"
    }
    ```
    
3.  **Submit** your additions via a Pull Request or GitHub Issue on the card's repository.
    
Your contributions make the card more visually helpful!

If you have added custom carrier logos that you think would benefit other users, feel free to contribute them to the repository! Submit a pull request with your additions to the  `carrier_logos.json`  file. This helps improve the card for everyone.

## Support

If you encounter any issues or have questions, please open an issue.


### Donate
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/yohaybn)

If you find it helpful or interesting, consider supporting me by buying me a coffee or starring the project on GitHub! ☕⭐
Your support helps me improve and maintain this project while keeping me motivated. Thank you! ❤️


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
