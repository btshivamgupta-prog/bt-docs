# Project

Projects organize related operational and commercial work. The route `admin.project` maps to `frontend/src/view/pages/project/Project.vue`; server ownership is `ProjectController.php` with milestones managed by `ProjectMilestoneController.php`.

A project may connect sites, visits, resources, costing, and milestones. Make project changes through the aggregate workflow so milestone and cost data cannot become detached from the project. Test project creation, update, detail, exports, and any visit/quotation links when extending it.
