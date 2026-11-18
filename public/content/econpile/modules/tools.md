# Tools

Tools are company equipment filtered by `equip_type=tool` on the `admin.equipment` route. Tool lifecycle code includes `EquipmentController.php`, `ToolAllocationController.php`, `Tool-Movment.vue`, and assignment/release requests.

Tool allocation must be traceable: record holder, originating and destination context, timestamps, approval/status, and release. Availability shown in a visit or calendar must be consistent with the movement record. Never mark a tool “available” merely by removing it from a UI list.
