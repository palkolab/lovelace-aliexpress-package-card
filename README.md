
# AliExpress Package Card

This custom Lovelace card displays packages from AliExpress, allowing you to track your orders directly from Home Assistant with [AliExpress Tracker component ](https://github.com/yohaybn/HA_aliexpress_package_tracker_sensor).

## Screenshots

![AliExpress Package Card](https://github.com/yohaybn/lovelace-aliexpress-package-card/blob/main/images/screenshot_light.png)
![AliExpress Package Card](https://github.com/yohaybn/lovelace-aliexpress-package-card/blob/main/images/screenshot_dark.png)

## Features

- Display AliExpress package tracking information
- Add new tracking numbers
- Edit and remove existing tracking numbers
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
```

## Carrier Logos Feature

The  **AliExpress Package Card**  supports displaying carrier logos for better visual identification of shipping carriers. This feature uses a JSON file (`carrier_logos.json`) to map carrier names to their respective logo URLs.

#### Automatic Fallback to Favicon
If a carrier logo is not found in the  `carrier_logos.json`  file, the card will attempt to fetch the favicon from the carrier's website (if a  `carrier_url`  is provided in the tracking data). This ensures that a visual representation is available even if a specific logo is not defined.

#### Contributing Carrier Logos

If you have added custom carrier logos that you think would benefit other users, feel free to contribute them to the repository! Submit a pull request with your additions to the  `carrier_logos.json`  file. This helps improve the card for everyone.

## Support

If you encounter any issues or have questions, please open an issue.


### Donate
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/yohaybn)

If you find it helpful or interesting, consider supporting me by buying me a coffee or starring the project on GitHub! ☕⭐
Your support helps me improve and maintain this project while keeping me motivated. Thank you! ❤️


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
