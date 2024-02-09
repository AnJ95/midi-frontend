# Communication

## Domain Model

### PresetCategoryDefinition
```json
{
  "id": "bar",
  "orderId": 0, // alternativ durch Reihenfolge
  "text": "Bar Presets"
}
```
### PresetButtonDefinition
```json
{
  "id": "party-modus-1",
  "orderId": 0, // alternativ durch Reihenfolge
  "category": "bar", 
  "icon": "party",
  "color": "#ff00ff",
  "text": "Party 1" 
}
```

## Socket Messages

### Presets

<table>
<tr><td>Client</td><td>Server</td></tr>
<tr>
<td>

```json
{
  "type": "requestPresetCategoryDefinitions"
}
```
</td>
<td>

```json
{
  "type": "sendPresetCategoryDefinitions",
  "items": [] // PresetCategoryDefinition
}
```
</td>
</tr>
<tr>
<td>

```json
{
  "type": "requestPresetButtonDefinitions"
}
```
</td>
<td>

```json
{
  "type": "sendPresetButtonDefinitions",
  "items": [] // PresetButtonDefinition
}
```
</td>
</tr>
</table>