const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class AliExpressPackageCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  static styles = css`
    .card {
      padding: 16px;
      background-color: var(--card-background-color, #f9f9f9);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .package {
      margin-bottom: 16px;
      padding: 10px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background-color: var(--primary-background-color, #fff);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.4em;
      font-weight: bold;
      margin-bottom: 16px;
      color: var(--primary-text-color);
      user-select: text;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
    .attribute {
      display: flex;
      align-items: center;
      margin: 4px 0;
      color: var(--primary-text-color);
      user-select: text;
    }
    .attribute span {
      margin-right: 8px;
    }
    .link {
      color: var(--link-color, blue);
      text-decoration: underline;
      cursor: pointer;
      user-select: text;
    }
    ha-icon-button {
      --mdc-icon-button-size: 32px;
      --mdc-icon-size: 20px;
    }
    .add-tracking {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .add-tracking input {
      flex: 1;
      padding: 8px;
      border: none;
      border-bottom: 1px solid var(--divider-color, #ccc);
      outline: none;
      background: transparent;
      color: var(--primary-text-color);
      user-select: text;
    }
    .add-tracking button {
      padding: 8px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1.2em;
      color: var(--primary-text-color);
    }
    .actions button {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1.2em;
      color: var(--primary-text-color);
    }
  `;

  static attributeIcons = {
    order_number: "🔢",
    status: "📦",
    last_update_time: "⏰",
    last_update_status: "🕒",
    progressStatus: "📈",
    carrier: "🚚",
    carrier_url: "🔗",
    daysNumber: "📅",
    orignal_track_id: "🔖",
    order_url: "🔗",
  };

  setConfig(config) {
    this.config = config;
  }

  getAliExpressEntities() {
    return Object.keys(this.hass.states).filter(
      (entity_id) =>
        entity_id.startsWith("sensor.") &&
        this.hass.states[entity_id].attributes.attribution?.includes(
          "Cainiao API"
        )
    );
  }

  handleRemove(entity_id) {
    this.hass.callService("aliexpress_package_tracker", "remove_tracking", {
      entity_id: [entity_id],
    });
  }

  handleEdit(entity_id, title) {
    const newTitle = prompt("Enter new title:", title);
    if (newTitle && newTitle !== title) {
      this.hass.callService("aliexpress_package_tracker", "edit_title", {
        entity_id: [entity_id],
        new_title: newTitle,
      });
    }
  }

  handleAddTracking() {
    const trackingNumber =
      this.shadowRoot.getElementById("trackingInput").value;
    if (trackingNumber) {
      this.hass.callService("aliexpress_package_tracker", "add_tracking", {
        tracking_number: trackingNumber,
      });
      this.shadowRoot.getElementById("trackingInput").value = "";
    }
  }

  formatTime(timeString) {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }); // Converts to readable format without year and seconds
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    const entities = this.getAliExpressEntities();
    const showAddTracking = !this.config.hide_add_tracking;

    return html`
      <ha-card class="card">
        <div class="header">${this.config.title}</div>
        ${showAddTracking
          ? html`
              <div class="add-tracking">
                <input
                  id="trackingInput"
                  type="text"
                  placeholder="Enter tracking number"
                />
                <button @click="${this.handleAddTracking}">➕</button>
              </div>
            `
          : ""}
        ${entities.length === 0
          ? html`<div>No tracked packages found.</div>`
          : entities.map((entity_id) => {
              const entity = this.hass.states[entity_id];
              const excludedAttributes = [
                "title",
                "icon",
                "attribution",
                "friendly_name",
                ...(this.config.exclude_attributes || []),
              ];
              const attributes = Object.entries(entity.attributes).filter(
                ([key, value]) => value && !excludedAttributes.includes(key)
              );

              return html`
                <div class="package">
                  <div class="header">
                    <span>${entity.attributes.title || entity_id}</span>
                    <div class="actions">
                      <button
                        title="Edit Title"
                        @click=${() =>
                          this.handleEdit(
                            entity.entity_id,
                            entity.attributes.title
                          )}
                      >
                        ✏️
                      </button>
                      <button
                        title="Remove Tracking"
                        @click="${() => this.handleRemove(entity_id)}"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  ${attributes.map(([key, value]) => {
                    const icon =
                      AliExpressPackageCard.attributeIcons[key] || "ℹ️";
                    const displayValue = key.includes("time")
                      ? this.formatTime(value)
                      : value;
                    return html`
                      <div class="attribute">
                        <span>${icon}</span>
                        <b
                          >${key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}:</b
                        >
                        ${value.toLowerCase().startsWith("http")
                          ? html`<a href="${value}" target="_blank" class="link"
                              >${value}</a
                            >`
                          : html`${displayValue}`}
                      </div>
                    `;
                  })}
                </div>
              `;
            })}
      </ha-card>
    `;
  }

  static getConfigElement() {
    return document.createElement("aliexpress-package-card-editor");
  }

  static getStubConfig() {
    return { exclude_attributes: [], hide_add_tracking: false };
  }
}

customElements.define("aliexpress-package-card", AliExpressPackageCard);

// Puts card into the UI card picker dialog
window.customCards = window.customCards || [];
window.customCards.push({
  type: "aliexpress-package-card",
  name: "AliExpress Package Card",
  preview: true,
  description: "This Lovelace custom card displays packages from AliExpress.",
});

// GUI Configuration Editor
class AliExpressPackageCardEditor extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  setConfig(config) {
    this.config = config;
  }

  get _excludeAttributes() {
    return this.config?.exclude_attributes || [];
  }

  get _hideAddTracking() {
    return this.config?.hide_add_tracking || false;
  }

  get _title() {
    return this.config?.title || "AliExpress Package Tracker";
  }

  handleExcludeChange(event) {
    const newExcludeAttributes = event.detail.value.exclude_attributes || [];
    this.config = { ...this.config, exclude_attributes: newExcludeAttributes };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this.config } })
    );
  }

  handleHideAddTrackingChange(event) {
    const hideAddTracking = event.detail.value.hide_add_tracking;
    this.config = { ...this.config, hide_add_tracking: hideAddTracking };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this.config } })
    );
  }

  handleTitleChange(event) {
    const title = event.detail.value.title;
    this.config = { ...this.config, title: title };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this.config } })
    );
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    const allAttributes = [
      "order_number",
      "status",
      "last_update_status",
      "last_update_time",
      "daysNumber",
      "progressStatus",
      "orignal_track_id",
      "carrier",
      "carrier_url",
      "order_url",
    ];

    return html`
      <div class="config">
        <p>Select which attributes you want to hide from the card.</p>
        <ha-form
          .data=${{
            exclude_attributes: this._excludeAttributes,
            hide_add_tracking: this._hideAddTracking,
            title: this._title,
          }}
          .schema=${[
            {
              name: "hide_add_tracking",
              selector: {
                boolean: {
                  label: "Hide 'Add Tracking' Section",
                },
              },
            },
            {
              name: "exclude_attributes",
              selector: {
                select: {
                  multiple: true,
                  options: allAttributes.map((attr) => ({
                    value: attr,
                    label: attr
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase()),
                  })),
                },
              },
            },

            {
              name: "title",
              selector: {
                text: {
                  value: this._title,
                  placeholder: "Enter title",
                },
              },
              label: "Title",
            },
          ]}
          @value-changed=${(event) => {
            this.handleExcludeChange(event);
            this.handleHideAddTrackingChange(event);
            this.handleTitleChange(event);
          }}
        >
        </ha-form>
      </div>
    `;
  }
}

customElements.define(
  "aliexpress-package-card-editor",
  AliExpressPackageCardEditor
);
