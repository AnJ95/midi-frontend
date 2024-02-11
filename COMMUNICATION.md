# Communication

## Domain Model

### PresetCategoryDefinition

```json
{
  "id": "bar",
  "text": "Bar Presets"
}
```

### PresetButtonDefinition

```json
{
  "id": "party-modus-1",
  "category": "bar",
  "icon": "party",
  "color": "#ff00ff",
  "text": "Party 1"
}
```

### HoldActionDefinition

```json
{
  "id": "strobo-1",
  "icon": "strobo",
  "color": "#ff00ff",
  "text": "Strobo"
}
```

### FaderDefinition

```json
{
  "id": "hexagons",
  "icon": "hexagon",
  "color": "#ff00ff",
  "text": "Hexagons"
}
```

### FaderState

```json
{
  "id": "hexagons",
  "state": 1.0
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
</td></tr><tr><td>

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
</td></tr><tr><td>

```json
{
  "type": "setPreset",
  "category": "bar",
  "id": "party-modus-1"
}
```

</td><td>
</td></tr></table>

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
</td></tr><tr><td>

```json
{
  "type": "requestFaderState",
  "id": "hexagons"
}
```

</td><td>

```json
{
  "type": "sendFaderState",
  "item": {}
}
```

Item type: [FaderState](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#FaderState)
</td></tr><tr><td>
</td><td>

```json
{
  "type": "startFaderHighlight",
  "id": "hexagons"
}
```

```json
{
  "type": "stopFaderHighlight",
  "id": "hexagons"
}
```

Oder lieber in FaderState packen?
</td></tr></table>

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
</td></tr></table>