# Communication

## Domain Model

### PresetCategoryDefinition

```json
{
  "row": 0,
  "text": "Bar Presets",
}
```

### PresetButtonDefinition

```json
{
  "row": 2,
  "column": 7,
  "icon": "party",
  "color": "#ff00ff",
  "text": "Party 1",
}
```

### HoldActionDefinition

```json
{
  "row": 1,
  "column": 2,
  "icon": "strobo",
  "color": "#ff00ff",
  "text": "Strobo",
}
```

### FaderDefinition

```json
{
  "row": 0,
  "column": 5,
  "icon": "hexagon",
  "color": "#ff00ff",
  "text": "Hexagons",
}
```

## Socket Messages

### Presets

<table>
<tr><td>Client</td><td>Server</td></tr>
<tr><td>

```json
{
  "type": "requestPresetCategoryDefinitions",
}
```

</td><td>

```json
{
  "type": "sendPresetCategoryDefinitions",
  "items": [],
}
```

Item
type: [PresetCategoryDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#PresetCategoryDefinition)
</td></tr>
</table>

### PresetActions

<table>
<tr><td>

```json
{
  "type": "requestPresetButtonDefinitions",
}
```

</td><td>

```json
{
  "type": "sendPresetButtonDefinitions",
  "items": [],
}
```

Item
type: [PresetButtonDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#PresetButtonDefinition)
</td></tr>
<tr><td>

```json
{
  "type": "setPreset",
  "row": 2,
  "column": 1,
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
  "type": "requestHoldActionDefinitions",
}
```

</td><td>

```json
{
  "type": "sendHoldActionDefinitions",
  "items": [],
}
```

Item
type: [HoldActionDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#HoldActionDefinition)
</td></tr><tr><td>

```json
{
  "type": "startHoldAction",
  "row": 2,
  "column": 0,
}
```

```json
{
  "type": "stopHoldAction",
  "row": 0,
  "column": 7,
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
  "type": "requestFaderDefinitions",
}
```

</td><td>

```json
{
  "type": "sendFaderDefinitions",
  "items": [],
}
```

Item type: [FaderDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#FaderDefinition)
</td></tr>
<tr><td>

```json
{
  "type": "requestFaderState",
  "row": 2,
  "column": 0,
}
```

</td><td>

```json
{
  "type": "sendFaderState",
  "row": 0,
  "column": 4,
  "value": 0.141,
}
```

</td></tr>
<tr><td>
</td><td>

```json
{
  "type": "startFaderHighlight",
  "row": 0,
  "column": 7,
}
```

```json
{
  "type": "stopFaderHighlight",
  "row": 0,
  "column": 3,
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
  "type": "pageLeft",
}
```

```json
{
  "type": "pageRight",
}
```

</td><td>
</td></tr>
</table>