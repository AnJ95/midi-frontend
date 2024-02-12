# Communication

## Domain Model

### PresetCategoryDefinition

```json
{
  "id": 0,
  "text": "Bar Presets"
}
```

### PresetButtonDefinition

```json
{
  "row": 2,
  "column": 7,
  "icon": "party",
  "color": "#ff00ff",
  "text": "Party 1"
}
```

### HoldActionDefinition

```json
{
  "column": 2,
  "icon": "strobo",
  "color": "#ff00ff",
  "text": "Strobo"
}
```

### FaderDefinition

```json
{
  "column": 5,
  "icon": "hexagon",
  "color": "#ff00ff",
  "text": "Hexagons"
}
```

## Socket Messages

### Presets

<table>
<tr><td>Client</td><td>Server</td></tr>
<tr><td>

```json
{
  "type": "requestPresetCategoryDefinitions"
}
```

</td><td>

```json
{
  "type": "sendPresetCategoryDefinitions",
  "items": []
}
```

Item
type: [PresetCategoryDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#PresetCategoryDefinition)
</td></tr>
<tr><td>

```json
{
  "type": "requestPresetButtonDefinitions"
}
```

</td><td>

```json
{
  "type": "sendPresetButtonDefinitions",
  "items": []
}
```

Item
type: [PresetButtonDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#PresetButtonDefinition)
</td></tr>
<tr><td>

```json
{
  "type": "setPreset",
  "id": "party-modus-1"
}
```

</td><td>
</td></tr>
</table>

### HoldActions

<table>
<tr><td>Client</td><td>Server</td></tr>
<tr><td>

```json
{
  "type": "requestHoldActionDefinitions"
}
```

</td><td>

```json
{
  "type": "sendHoldActionDefinitions",
  "items": []
}
```

Item
type: [HoldActionDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#HoldActionDefinition)
</td></tr><tr><td>

```json
{
  "type": "startHoldAction",
  "id": "strobo-1"
}
```

```json
{
  "type": "stopHoldAction",
  "id": "strobo-1"
}
```

</td><td>
</td></tr></table>

### Fader

<table>
<tr><td>Client</td><td>Server</td></tr>
<tr><td>

```json
{
  "type": "requestFaderDefinitions"
}
```

</td><td>

```json
{
  "type": "sendFaderDefinitions",
  "items": []
}
```

Item type: [FaderDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#FaderDefinition)
</td></tr>
<tr><td>

```json
{
  "type": "requestFaderState",
  "column": 0
}
```

</td><td>

```json
{
  "type": "sendFaderState",
  "column": 4,
  "value": 255,
}
```

</td></tr>
<tr><td>
</td><td>

```json
{
  "type": "startFaderHighlight",
  "column": 7
}
```

```json
{
  "type": "stopFaderHighlight",
  "column": 3
}
```

</td></tr>
</table>

### Pagination

<table>
<tr><td>Client</td><td>Server</td></tr>
<tr><td>

```json
{
  "type": "pageLeft"
}
```

```json
{
  "type": "pageRight"
}
```

</td><td>
</td></tr>
</table>