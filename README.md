# AliExpress Package Card

This custom Lovelace card displays packages from AliExpress, allowing you to track your orders directly from Home Assistant.

## Features

- Display AliExpress package tracking information
- Add new tracking numbers
- Edit and remove existing tracking numbers
- Compatible with both light and dark themes

## Installation

### HACS (Preferred Way)

1. Ensure that [HACS](https://hacs.xyz/) is installed in your Home Assistant instance.
2. Go to HACS in the sidebar.
3. Click on "Frontend".
4. Click on the "+" button in the bottom right corner.
5. Search for "AliExpress Package Card".
6. Click on the card and then click "Install".

### Manual Installation

1. Download the `aliexpress_package_card.js` and `aliexpress_package_card_editor.js` files from the repository.
2. Place the files in your `config/www` directory.
3. Add the following to your `ui-lovelace.yaml` or Lovelace resources:

```yaml
resources:
  - url: /local/aliexpress_package_card.js
    type: module
  - url: /local/aliexpress_package_card_editor.js
    type: module
```

## Configuration

Add the custom card to your Lovelace configuration:

```yaml
type: custom:aliexpress-package-card
title: AliExpress Package Tracker
hide_add_tracking: false
exclude_attributes:
  - order_number
  - status
  - last_update_time
  - last_update_status
  - progressStatus
  - carrier
  - carrier_url
  - daysNumber
  - orignal_track_id
  - order_url
```

### Options

- `title` (string): The title of the card.
- `hide_add_tracking` (boolean): Whether to hide the "Add Tracking" section. Default is `false`.
- `exclude_attributes` (list): List of attributes to exclude from the card display.

## Example

```yaml
type: custom:aliexpress-package-card
title: My AliExpress Orders
hide_add_tracking: false
exclude_attributes:
  - carrier_url
  - order_url
```

## Screenshots

![AliExpress Package Card](screenshot.png)

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/your-repo/aliexpress-package-card).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.