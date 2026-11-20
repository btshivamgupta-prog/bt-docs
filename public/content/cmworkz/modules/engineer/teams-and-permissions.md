# Teams, Users, Roles, and Permissions

UserController, TeamController, CommonTeamController, RoleController, and EngineerController provide access and assignment administration. Spatie permission middleware is registered in app/Http/Kernel.php.

Workflow: create user/engineer -> assign role and permission -> assign team -> use team membership in jobs and visits -> audit activity and history. Exact role inheritance and per-page permission rules are Not verified; inspect route middleware and frontend permission checks.
