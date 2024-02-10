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
  "orderId": 0,
  "state": 1.0
}
```
`orderId` oder lieber `id`?

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
Alternativ on connect?
</td><td>

```json
{
  "type": "sendPresetCategoryDefinitions",
  "items": []
}
```
Item type: [PresetCategoryDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#PresetCategoryDefinition)
</td></tr><tr><td>

```json
{
  "type": "requestPresetButtonDefinitions"
}
```
Alternativ on connect?
</td><td>

```json
{
  "type": "sendPresetButtonDefinitions",
  "items": []
}
```
Item type: [PresetButtonDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#PresetButtonDefinition)
</td></tr><tr><td>

```json
{
  "type": "setPreset",
  "id": "party"
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
Alternativ on connect?
</td><td>

```json
{
  "type": "sendHoldActionDefinitions",
  "items": []
}
```
Item type: [HoldActionDefinition](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#HoldActionDefinition)
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
Alternativ on connect?
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
  "type": "requestAllFaderStates"
}
```
Alternativ on connect?
</td><td>

```json
{
  "type": "sendFaderStates",
  "items": []
}
```
```json
{
  "type": "sendFaderState",
  "item": {}
}
```
Item type: [FaderState](https://github.com/AnJ95/midi-frontend/blob/main/COMMUNICATION.md#FaderState)  
Initial `sendFaderStates`, danach `sendFaderState`
</td></tr><tr><td>
</td><td>

```json
{
  "type": "startFaderHighlight",
  "orderId": 0
}
```
```json
{
  "type": "stopFaderHighlight",
  "orderId": 0
}
```
Oder lieber in FaderState packen?  
`orderId` oder lieber `id`?
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